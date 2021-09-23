<template>
  <aside
    id="apartment-quiz"
    class="apartment-quiz flex flex-col items-end z-30 fixed"

    :class="{
      active: isQuizOpened,
    }"
  >
    <quiz-body
      @toggle-quiz="toggleQuiz()"
      @send-user-data="sendUserData()"
      @update:current-page="currentPage = $event"

      :apartment-types="fetchedQuizData.apartmentTypes"
      :slider-data="fetchedQuizData.rangeSlider"
      :text-data="fetchedQuizData.text"
      :current-page="currentPage"

      class="apartment-quiz__body z-10 absolute bottom-0"
    />

    <quiz-trigger
      @toggle-quiz="toggleQuiz()"

      class="apartment-quiz__trigger absolute bottom-0"
    />
  </aside>
</template>

<script>
import quizTrigger from './components/quiz-trigger.vue';
import quizBody from './components/quiz-body.vue';

export default {
  name: 'App',
  data(){
    return {
      isQuizOpened: false,
      currentPage: 0,
      fetchedQuizData: {
        apartmentTypes: [
          {
            title: 'Студия',
          },
          {
            title: '1-комнатная',
          },
          {
            title: '2-комнатная',
          },
          {
            title: '3-комнатная',
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
      },
      userData: {
        apartmentTypes: [],
        price: 0,
        phone: '',
      },
    }
  },
  methods: {
    toggleQuiz(){
      this.isQuizOpened = !this.isQuizOpened;

      if(!this.isQuizOpened){
        this.currentPage = 0;
      }
    },

    async sendUserData(){
      console.log('Send data'); // TODO: implement sending data to server
    },
  },
  components: {
    quizTrigger,
    quizBody,
  }
}
</script>
