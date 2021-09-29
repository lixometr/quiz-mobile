<template>
  <div class="quiz-body rounded-lg px-4 sm:px-6 pt-6 flex flex-col">
    <button
      @click="$emit('toggle-quiz')"

      class="quiz-body__close ml-auto"
    ></button>

    <quiz-preloader
      :class="{
        'quiz-preloader_hidden': isQuizDataLoaded,
      }"
    />

    <quiz-track
      @user-phone-change="updateUserPhone($event)"
      @update-range-pages="updateRangePages($event)"
      @chosen-apartments-change="updateChosenApartments($event)"

      :errors="errors"
      :slider-data="sliderData"
      :slider-pages="sliderPages"
      :current-page="currentPage"
      :titles="textData.pageTitles"
      :subtitles="textData.subtitles"
      :apartment-types="apartmentTypes"
      :success-page-image="successPageImage"
      :max-question-length="maxQuestionLength"
      :class="{
        'quiz-body__track_hidden': !isQuizDataLoaded,
      }"
    />

    <quiz-footer
      @set-current-page="setCurrentPage($event)"
      @send-user-data="sendUserData()"

      :user-data="userData"
      :current-page="currentPage"
      :pagination-items="paginationItems"
      :agreement-text="textData.agreementText"
      :send-button-text="textData.sendButtonText"
      :next-page-button-text="textData.nextPageButtonText"

      class="mt-4"

      v-if="currentPage !== paginationItems.length - 1"
    />
  </div>
</template>

<script>
import quizTrack from './quiz-track.vue';
import quizFooter from './quiz-footer.vue';
import quizPreloader from './common/quiz-preloader.vue';
import { EmptyErrorsObject } from '../../constants.js';

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
    userData: {
      type: Object,
      default: function(){
        return {};
      }
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    maxQuestionLength: {
      type: Number,
      default: 0,
    },
    successPageImage: {
      type: String,
      default: '',
    },
    sliderPages: {
      type: Array,
      default: function(){
        return [];
      }
    },
    errors: {
      type: Object,
      default: function(){
        return { ...EmptyErrorsObject }
      }
    },
    isQuizDataLoaded: {
      type: Boolean,
      default: true,
    }
  },
  data(){
    return {
      cCurrentPage: this.currentPage,
      paginationItems: [],
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

    updateChosenApartments(apartmentsData){
      this.$emit('chosen-apartments-change', apartmentsData)
    },

    updateRangePages(price){
      this.$emit('update-range-pages', price);
    },

    updateUserPhone(phone){
      this.$emit('user-phone-change', phone);
    },
  },
  watch: {
    currentPage(newPage){
      this.paginationItems.forEach((page, index) => {
        page.isVisited = index <= newPage;
      });
    },

    sliderPages(newPages){
      this.paginationItems = [...newPages].map((p, idx) => {
        return {
          isVisited: idx === 0,
        }
      });
    },
  },
  components: {
    quizTrack,
    quizFooter,
    quizPreloader,
  }
}
</script>
