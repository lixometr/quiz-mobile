<template>
  <aside
    id="apartment-quiz"
    class="apartment-quiz flex flex-col justify-end items-end z-30 fixed"

    :class="{
      active: isQuizOpened,
    }"
    :style="cssVars"
  >
    <quiz-body
      @toggle-quiz="toggleQuiz()"
      @send-user-data="sendUserData()"
      @update:current-page="updateCurrentPage($event)"
      @user-phone-change="updateUserPhone($event)"
      @apartment-price-change="updateApartmentPrice($event)"
      @chosen-apartments-change="updateChosenApartments($event)"

      :success-page-image="fetchedQuizData.successPageImage"
      :apartment-types="fetchedQuizData.apartmentTypes"
      :slider-data="fetchedQuizData.rangeSlider"
      :max-question-length="maxQuestionLength"
      :is-quiz-data-loaded="isQuizDataLoaded"
      :text-data="fetchedQuizData.text"
      :current-page="currentPage"
      :user-data="userData"
      :errors="errors"

      class="apartment-quiz__body z-10 absolute bottom-0"
    />

    <quiz-trigger
      @toggle-quiz="toggleQuiz()"

      :trigger-text="quizTriggerData.text"
      :trigger-icon="quizTriggerData.icon"

      class="apartment-quiz__trigger"
    />
  </aside>
</template>

<script>
import quizTrigger from './components/quiz-trigger.vue';
import quizBody from './components/quiz-body.vue';
import { EmptyUserObject, EmptyErrorsObject, MAX_PHONE_CHARACTERS, pagesMap, apiPaths, pagesId } from '../constants.js';

export default {
  name: 'App',
  data(){
    return {
      isQuizOpened: false,
      isQuizDataLoaded: false,
      currentPage: 0,
      maxQuestionLength: 0,
      fetchedQuizData: {},
      targetsData: {},
      colorsData: {},
      quizTriggerData: {
        icon: '',
        text: '',
      },
      userData: {
        ...EmptyUserObject,
      },
      errors: {
        ...EmptyErrorsObject,
      },
    }
  },
  async mounted(){
    this.isQuizDataLoaded = false;

    const quizData = await this.fetchQuizData();

    const {
      subtitles,
      pageTitles,
      colorsData,
      triggerData,
      targetsData,
      rangeSlider,
      agreementText,
      sendButtonText,
      apartmentTypes,
      successPageImage,
      maxQuestionLength,
      nextPageButtonText,
    } = this.mapQuizData(quizData);

    this.maxQuestionLength = maxQuestionLength;

    this.quizTriggerData = {
      ...triggerData,
    }

    this.targetsData = {
      ...targetsData,
    }

    this.colorsData = {
      ...colorsData,
    }

    this.fetchedQuizData = {
      apartmentTypes,
      successPageImage,
      rangeSlider: {
        minValue: rangeSlider.min,
        maxValue: rangeSlider.max,

        value: rangeSlider.default,
      },
      text: {
        pageTitles,
        subtitles,
        agreementText,
        nextPageButtonText,
        sendButtonText,
      }
    };

    this.userData.price = rangeSlider.default;

    this.isQuizDataLoaded = true;
  },
  methods: {
    mapQuizData(quizData){
      const triggerData = quizData.button;
      const colorsData = quizData.colors;
      const targetsData = quizData.targets;
      const nextPageButtonText = quizData.screens.button;
      const maxQuestionLength = quizData.screens.questions;

      const pageTitles =
        quizData.screens.items
          .map(page => page.title);

      const subtitles =
        quizData.screens.items
          .map(page => page.text)
          .filter(t => !!t);

      const agreementText =
        quizData.screens.items
          .find(screen => screen.id === pagesId.phone).text_bottom;

      const sendButtonText =
        quizData.screens.items
          .find(screen => screen.id === pagesId.phone).button;

      const successPageImage =
        quizData.screens.items
          .find(screen => screen.id === pagesId.final).image;

      const rangeSlider =
        quizData.screens.items
          .find(screen => screen.id === pagesId.price).values;

      const apartmentTypes =
        quizData.screens.items
          .find(screen => screen.id === pagesId.rooms).values
            .map(type => {
              return {
                title: type,
                isChecked: false,
              }
            });

      return {
        subtitles,
        pageTitles,
        colorsData,
        rangeSlider,
        triggerData,
        targetsData,
        agreementText,
        sendButtonText,
        apartmentTypes,
        successPageImage,
        maxQuestionLength,
        nextPageButtonText,
      }
    },

    mapUserData(userData){
      const answers = {}

      answers[pagesId.rooms] = userData.apartmentTypes
        .map(type => this.fetchedQuizData.apartmentTypes[type].title);

      answers[pagesId.price] = `${userData.price}`;

      const mappedUserData = {
        answers,
        phone: this.userData.phone,
      }

      return mappedUserData;
    },

    toggleQuiz(){
      this.isQuizOpened = !this.isQuizOpened;

      if(!this.isQuizOpened){
        this.currentPage = 0;

        this.userData = {
          ...EmptyUserObject,
        };

        this.fetchedQuizData.apartmentTypes
          .forEach(type => type.isChecked = false);
      }
    },

    updateCurrentPage(page){
      if(this.validateUserData(this.userData, page - 1)){
        this.currentPage = page;
      }
    },

    validateUserData(userData, currentPage, validateAll = false){
      let validateState = true;

      if(currentPage === pagesMap.apartmentTypePage || validateAll){
        this.errors.apartmentTypeError = !userData.apartmentTypes.length;

        validateState = validateState && !this.errors.apartmentTypeError;
      }

      if(currentPage === pagesMap.apartmentPricePage || validateAll){
        this.errors.priceError = !userData.price;

        validateState = validateState && !this.errors.priceError;
      }

      if(currentPage === pagesMap.formPage || validateAll){
        this.errors.phoneError = userData.phone.length !== MAX_PHONE_CHARACTERS;

        validateState = validateState && !this.errors.phoneError;
      }

      return validateState;
    },

    async fetchQuizData(){
      return await fetch(apiPaths.getPath, {
        method: 'POST',
      })
        .then(res => res.json())
        .catch(err => console.log(err.response));
    },

    async sendUserData(){
      if(this.validateUserData(this.userData, -1, true)){
        const formData = new FormData();
        const {userPhone, answers} = this.mapUserData(this.userData);

        formData.set('phone', userPhone);
        formData.set('answers', answers);

        await fetch(apiPaths.postPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: formData,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

        await this.sendMetrics();
      }
    },

    async sendMetrics(){
      if (typeof gtag === 'function'){

        // eslint-disable-next-line no-undef
        gtag(
          'event',
          this.targetsData.google[0],
          {
            event_category: this.targetsData.google[1],
            event_label: this.targetsData.google[2],
          },
        );
      }

      if (typeof ym === 'function' && this.targetsData.yandex.yMetrikaId){
        // eslint-disable-next-line no-undef
        ym(
          this.targetsData.yandex.yMetrikaId,
          'reachGoal',
          this.targetsData.yandex.yandexTarget,
          {},
        );
      }
    },

    updateChosenApartments(apartments){
      this.userData.apartmentTypes = [...apartments];
    },

    updateApartmentPrice(price){
      this.userData.price = price;
    },

    updateUserPhone(phone){
      this.userData.phone = phone;
    },

    setErrors(errors){
      this.errors = {
        ...this.errors,
        ...errors,
      }
    },
  },
  computed: {
    cssVars(){
      const stylesObj = {};

      Object.keys(this.colorsData)
      .forEach(key => {
        stylesObj[`--quiz-${key}`] = this.colorsData[key];
      })

      return stylesObj;
    }
  },
  components: {
    quizTrigger,
    quizBody,
  }
}
</script>
