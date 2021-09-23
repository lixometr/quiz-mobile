<template>
  <div class="quiz-body rounded-lg px-6 pt-6 flex flex-col">
    <button
      @click="$emit('toggle-quiz')"

      class="quiz-body__close ml-auto"
    ></button>

    <quiz-track
      :slider-data="sliderData"
      :current-page="currentPage"
      :titles="textData.pageTitles"
      :subtitles="textData.subtitles"
      :apartment-types="apartmentTypes"

      class="mb-4"
    />

    <quiz-footer
      @set-current-page="setCurrentPage($event)"
      @send-user-data="sendUserData()"

      :pages="pagesArr"
      :current-page="currentPage"
      :agreement-text="textData.agreementText"

      v-if="currentPage !== pagesArr.length - 1"
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
    textData: {
      type: Object,
      default: function(){
        return {};
      }
    },
    currentPage: {
      type: Number,
      default: 0,
    }
  },
  data(){
    return {
      cCurrentPage: this.currentPage,
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
      this.cCurrentPage = page;
      this.$emit('update:current-page', page);
    },

    sendUserData(){
      this.$emit('send-user-data');
    },
  },
  watch: {
    currentPage(newPage){
      this.pagesArr.forEach((page, index) => {
        page.isVisited = index <= newPage;
      });
    }
  },
  components: {
    quizTrack,
    quizFooter,
  }
}
</script>
