<template>
  <aside
    id="apartment-quiz"
    class="apartment-quiz flex flex-col items-end z-30 fixed"

    :class="{
      active: isQuizOpened,
    }"
  >
    <quiz-body
      @toggle-quiz="toggleQuiz"

      :apartment-types="fetchedQuizData.apartmentTypes"
      :slider-data="fetchedQuizData.rangeSlider"

      class="apartment-quiz__body z-10 absolute bottom-0"
    />

    <quiz-trigger
      @toggle-quiz="toggleQuiz"

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
          minValue: 0,
          maxValue: 3000,
          value: 1000,
        },
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
    },
  },
  components: {
    quizTrigger,
    quizBody,
  }
}
</script>
