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
      @user-phone-change="updateUserPhone($event)"
      @update-range-pages="updateRangePages($event)"
      @update:current-page="updateCurrentPage($event)"
      @chosen-apartments-change="updateListBoxPages($event)"

      :success-page-image="fetchedQuizData.successPageImage"
      :max-question-length="maxQuestionLength"
      :is-quiz-data-loaded="isQuizDataLoaded"
      :text-data="fetchedQuizData.text"
      :slider-pages="sliderPages"
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
import { EmptyUserObject, EmptyErrorsObject, MAX_PHONE_CHARACTERS, apiPaths, pageTypes, pagesId } from '../constants.js';

export default {
  name: 'App',
  data(){
    return {
      isQuizOpened: false,
      isQuizDataLoaded: false,
      currentPage: 0,
      maxQuestionLength: 0,
      fetchedQuizData: {},
      sliderPages: [
        {
          id: '',
          text: '',
          title: '',
          type: pageTypes.phone,
        },
        {
          id: '',
          text: '',
          title: '',
          type: pageTypes.info,
        },
      ],
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
      colorsData,
      triggerData,
      targetsData,
      sliderPages,
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

    this.sliderPages = [
      ...sliderPages,
    ]

    this.fetchedQuizData = {
      apartmentTypes,
      successPageImage,
      rangeSlider: {
        minValue: rangeSlider.min,
        maxValue: rangeSlider.max,

        value: rangeSlider.default,
      },
      text: {
        agreementText,
        nextPageButtonText,
        sendButtonText,
      }
    };

    this.isQuizDataLoaded = true;
  },
  methods: {
    mapQuizData(quizData){
      const colorsData = quizData.colors;
      const triggerData = quizData.button;
      const targetsData = quizData.targets;
      const nextPageButtonText = quizData.screens.button;
      const maxQuestionLength = quizData.screens.questions;

      const agreementText =
        quizData.screens.items
          .find(screen => screen.type === pageTypes.phone).text_bottom;

      const sendButtonText =
        quizData.screens.items
          .find(screen => screen.type === pageTypes.phone).button;

      const successPageImage =
        quizData.screens.items
          .find(screen => screen.type === pageTypes.info).image;

      const rangeSlider =
        quizData.screens.items
          .find(screen => screen.id === pagesId.price).values;

      const sliderPages = quizData.screens.items
        .map(page => {
          if(page.type === pageTypes.listBox){
            return {
              ...page,
              values: page.values.map(type => {
                return {
                  type,
                  isChecked: false,
                }
              })
            }
          }

          else if(page.type === pageTypes.range){
            return {
              ...page,
              values: {
                minValue: page.values.min,
                maxValue: page.values.max,
                value: page.values.default,
              }
            }
          }

          return page;
        });

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
        colorsData,
        rangeSlider,
        sliderPages,
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

    toggleQuiz(){
      this.isQuizOpened = !this.isQuizOpened;

      if(!this.isQuizOpened){
        this.currentPage = 0;

        this.userData = {
          answers: {},
          phone: '',
        };

        this.sliderPages
          .filter(page => page.type === pageTypes.listBox)
          .forEach(page => page.values.forEach(type => type.isChecked = false));
      }
    },

    updateCurrentPage(page){
      if(this.validateUserData(this.userData, page - 1)){
        this.currentPage = page;
      }
    },

    constrain(val, min, max){
      return val > max ? max : val < min ? min : val;
    },

    validateUserData(userData, currentPage, validateAll = false){
      let validateState = true;
      currentPage = this.constrain(currentPage, 0, this.sliderPages.length - 1);

      const pageType = this.sliderPages[currentPage]?.type;
      const pageId = this.sliderPages[currentPage]?.id;


      if(pageType === pageTypes.listBox || validateAll){
        this.$set(this.errors, pageId, !userData?.answers[pageId]?.length);

        validateState = validateState && !this.errors[pageId];
      }

      if(pageType === pageTypes.range || validateAll){
        this.$set(this.errors, pageId, !userData?.answers[pageId]);

        validateState = validateState && !this.errors[pageId];
      }

      if(pageType === pageTypes.phone || validateAll){
        this.errors.phoneError = userData.phone?.length !== MAX_PHONE_CHARACTERS;

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
        const { phone, answers } = this.userData;

        formData.set('phone', phone);
        formData.set('answers', JSON.stringify(answers));

        await fetch(apiPaths.postPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          body: formData,
        })
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

    updateListBoxPages(apartmentsData){
      const {pageIndex, apartments} = apartmentsData;
      const currPage = this.sliderPages[pageIndex];

      currPage.values
        .forEach((type, index) => {
          type.isChecked = apartments.includes(index);
        });

      this.userData.answers[currPage.id] = currPage.values
        .filter(item => item.isChecked)
        .map(item => item.type);
    },

    updateRangePages(rangeData){
      const { pageIndex, rangeValue } = rangeData;
      const currPage = this.sliderPages[pageIndex];

      currPage.values.value = rangeValue;

      this.userData.answers[currPage.id] = rangeValue;
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
