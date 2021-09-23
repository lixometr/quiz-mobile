<template>
  <aside
    id="apartment-quiz"
    class="apartment-quiz flex flex-col justify-end items-end z-30 fixed"

    :class="{
      active: isQuizOpened,
    }"
  >
    <quiz-body
      @toggle-quiz="toggleQuiz()"
      @send-user-data="sendUserData()"
      @update:current-page="updateCurrentPage($event)"
      @user-phone-change="updateUserPhone($event)"
      @apartment-price-change="updateApartmentPrice($event)"
      @chosen-apartments-change="updateChosenApartments($event)"

      :apartment-types="fetchedQuizData.apartmentTypes"
      :slider-data="fetchedQuizData.rangeSlider"
      :text-data="fetchedQuizData.text"
      :current-page="currentPage"
      :user-data="userData"
      :errors="errors"

      class="apartment-quiz__body z-10 absolute bottom-0"
    />

    <quiz-trigger
      @toggle-quiz="toggleQuiz()"

      class="apartment-quiz__trigger"
    />
  </aside>
</template>

<script>
import quizTrigger from './components/quiz-trigger.vue';
import quizBody from './components/quiz-body.vue';
import { EmptyUserObject, EmptyErrorsObject, MAX_PHONE_CHARACTERS, pagesMap } from '../constants.js';

export default {
  name: 'App',
  data(){
    return {
      isQuizOpened: false,
      currentPage: 0,
      fetchedQuizData: {},
      userData: {
        ...EmptyUserObject,
      },
      errors: {
        ...EmptyErrorsObject,
      },
    }
  },
  async mounted(){
    await this.fetchQuizData();
  },
  methods: {
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
      const resolve = () => {
        setTimeout(() => {
          this.fetchedQuizData = {
            apartmentTypes: [
              {
                title: 'Студия',
                isChecked: false,
              },
              {
                title: '1-комнатная',
                isChecked: false,
              },
              {
                title: '2-комнатная',
                isChecked: false,
              },
              {
                title: '3-комнатная',
                isChecked: false,
              },
            ],
            rangeSlider: {
              minValue: 100000,
              maxValue: 3000000,

              value: 1000000,
            },
            text: {
              pageTitles: [
                'Какой тип квартиры вас интересует?',
                'Стоимость кавртиры',
                'Найдены квартиры по вашему запросу',
                'Спасибо!',
              ],
              subtitles: [
                'Мы готовы рассказать о них! На какой номер вам позвонить?',
                'Наш менеджер скоро свяжется с вами',
              ],
              agreementText: 'Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c политикой конфиденциальности',
            }
          };

          this.userData.price = this.fetchedQuizData.rangeSlider.value;
        }, 400);
      }

      const reject = () => {
        console.log('Fetch error');
      }

      return new Promise(resolve, reject);
    },

    async sendUserData(){
      if(this.validateUserData(this.userData, -1, true)){
        console.log('Send data', this.userData); // TODO: implement sending data to server
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
  components: {
    quizTrigger,
    quizBody,
  }
}
</script>
