<template>
  <div class="quiz-body rounded-lg px-6 pt-6 flex flex-col">
    <button
      @click="$emit('toggle-quiz')"

      class="quiz-body__close ml-auto"
    ></button>

    <quiz-track
      :current-page="currentPage"
      :slider-data="sliderData"
      :apartment-types="apartmentTypes"
      class="mb-4"
    />

    <!-- TODO: remove '|| true' -->
    <quiz-footer
      @set-current-page="setCurrentPage($event)"

      :current-page="currentPage"
      :pages="pagesArr"

      v-if="currentPage !== pagesArr.length - 1 || true"
    />
  </div>
</template>

<script>
import quizTrack from './quiz-track.vue';
import quizFooter from './quiz-footer.vue';

export default {
  props: {
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
  },
  data(){
    return {
      currentPage: 1,
      pagesArr: [
        {
          isVisited: true,
        },
        {
          isVisited: false,
        },
        {
          isVisited: false,
        },
        {
          isVisited: false,
        },
      ],
    }
  },
  methods: {
    setCurrentPage(page){
      this.currentPage = page;

      this.pagesArr.forEach((page, index) => {
        page.isVisited = index <= this.currentPage;
      });
    }
  },
  components: {
    quizTrack,
    quizFooter,
  }
}
</script>
