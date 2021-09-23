<template>
  <main
    class="quiz-body__track flex"
    :style="{
      transform: `translateX(-${quizTrackTranslate}px)`,
    }"
  >
    <quiz-page
      :title="titles[0]"
      class="quiz-body__page"
      ref="quizPage"
      :class="{
        active: currentPage === 0,
      }"

      title-class="mb-16"
    >
      <apartment-type-page
        @chosen-apartments-change="updateChosenApartments"

        :apartment-types="apartmentTypes"
      />
    </quiz-page>

    <quiz-page
      :title="titles[1]"
      class="quiz-body__page"
      :class="{
        active: currentPage === 1,
      }"

      title-class="mb-16"
    >
      <apartment-price-page
        :slider-data="sliderData"
      />
    </quiz-page>

    <quiz-page
      :title="titles[2]"
      class="quiz-body__page"
      :class="{
        active: currentPage === 2,
      }"

      title-class="mb-16"
    >
      <form-page
        :title="subtitles[0]"
      />
    </quiz-page>

    <quiz-page
      :title="titles[3]"
      class="quiz-body__page"
      :class="{
        active: currentPage === 3,
      }"

      title-class="mt-16 mb-5 text-4xl"
    >
      <success-page
        :title="subtitles[1]"
      />
    </quiz-page>
  </main>
</template>

<script>
import quizPage from './quiz-page.vue';
import formPage from './pages/form-page.vue';
import successPage from './pages/success-page.vue';
import apartmentTypePage from './pages/apartment-type-page.vue';
import apartmentPricePage from './pages/apartment-price-page.vue';

export default {
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    apartmentTypes: {
      type: Array,
      default: function(){
        return [];
      }
    },
    sliderData: {
      type: Object,
      default: function(){
        return {};
      }
    },
    titles: {
      type: Array,
      default: function(){
        return [];
      }
    },
    subtitles: {
      type: Array,
      default: function(){
        return [];
      }
    }
  },
  data(){
    return {
      quizPageWidth: 0,
    }
  },
  mounted(){
    this.quizPageWidth = this.$refs.quizPage.$el.getBoundingClientRect().width;

    window.addEventListener('resize', this.updatePageWidth.bind(this));
  },
  methods: {
    updatePageWidth(){
      this.quizPageWidth = this.$refs.quizPage.$el.getBoundingClientRect().width;
    },
    updateChosenApartments(apartments){
      console.log(apartments);
    }
  },
  computed: {
    quizTrackTranslate(){
      return this.quizPageWidth * this.currentPage;
    }
  },
  components: {
    quizPage,
    formPage,
    successPage,
    apartmentTypePage,
    apartmentPricePage,
  }
}
</script>
