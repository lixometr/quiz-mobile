<template>
  <div class="quiz-body rounded-lg px-6 pt-6 flex flex-col">
    <button
      @click="$emit('toggle-quiz')"

      class="quiz-body__close ml-auto"
    ></button>

    <quiz-track
      @user-phone-change="updateUserPhone($event)"
      @apartment-price-change="updateApartmentPrice($event)"
      @chosen-apartments-change="updateChosenApartments($event)"

      :errors="errors"
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

      :errors="errors"
      :pages="pagesArr"
      :user-data="userData"
      :current-page="currentPage"
      :agreement-text="textData.agreementText"

      v-if="currentPage !== pagesArr.length - 1"
    />
  </div>
</template>

<script>
import quizTrack from './quiz-track.vue';
import quizFooter from './quiz-footer.vue';
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
    errors: {
      type: Object,
      default: function(){
        return { ...EmptyErrorsObject }
      }
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

    updateChosenApartments(apartments){
      this.$emit('chosen-apartments-change', apartments)
    },

    updateApartmentPrice(price){
      this.$emit('apartment-price-change', price);
    },

    updateUserPhone(phone){
      this.$emit('user-phone-change', phone);
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
