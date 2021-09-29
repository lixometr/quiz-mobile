<template>
  <footer class="quiz-body__footer quiz-footer mt-auto pb-4">
    <ul class="quiz-footer__pagination mb-6 flex w-100 pt-3">
      <quiz-pagination-item
        @click.native="paginationClickHandler(index)"

        :index="index"
        :is-visited="page.isVisited"
        :current-page="currentPage"
        :total-pages="paginationItems.length"
        label-class="quiz-footer__paginatioon-label"
        class="quiz-footer__pagination-item"

        v-for="(page, index) in paginationItems"
        :key="index"
      />
    </ul>

    <div
      class="flex"

      v-if="currentPage < formPageIndex"
    >
      <button
        @click="setCurrentPage(currentPage - 1)"

        class="quiz-footer__navigator quiz-footer__navigator_prev mr-2 rounded-md"
        :disabled="currentPage === 0"
      >
        <span class="quiz-footer__navigator-arrow"></span>
      </button>

      <button
        @click="setCurrentPage(currentPage + 1)"

        class="quiz-footer__navigator quiz-footer__navigator_next flex-grow rounded-md text-quiz-white text-left pl-8 font-medium text-lg"
      >
        <span class="quiz-footer__navigator-arrow"></span>

        {{ nextPageButtonText }}
      </button>
    </div>

    <template v-else-if="currentPage === formPageIndex">
      <button
        @click="sendUserData()"

        class="quiz-footer__navigator quiz-footer__navigator_submit w-full rounded-md text-quiz-white text-center px-2 font-medium text-lg mb-3"
      >
        {{ sendButtonText }}
      </button>

      <p
        class="pl-5 pb-3 text-xs text-quiz-white leading-3 sm:leading-4 quiz-footer__agreement"

        v-html="agreementText"
      ></p>
    </template>
  </footer>
</template>

<script>
import { pageTypes } from '../../constants.js';
import quizPaginationItem from './quiz-pagination-item.vue';

export default {
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    agreementText: {
      type: String,
      default: '',
    },
    userData: {
      type: Object,
      default: function(){
        return {};
      }
    },
    nextPageButtonText: {
      type: String,
      default: 'Далее',
    },
    sliderPages: {
      type: Array,
      default: function(){
        return [];
      }
    },
    sendButtonText: {
      type: String,
      default: 'Отправить',
    },
    paginationItems: {
      type: Array,
      default: function(){
        return [];
      }
    },
  },
  data(){
    return {
      pages: [],
    }
  },
  methods: {
    paginationClickHandler(index){
      if(this.paginationItems[index].isVisited){
        this.setCurrentPage(index);
      }
    },

    setCurrentPage(page){
      this.$emit('set-current-page', page)
    },

    sendUserData(){
      this.$emit('send-user-data');
      this.setCurrentPage(this.currentPage + 1);
    },
  },
  computed: {
    formPageIndex(){
      return this.sliderPages.findIndex(page => page.type === pageTypes.phone)
    },

    successPageIndex(){
      return this.sliderPages.findIndex(page => page.type === pageTypes.info)
    }
  },
  components: {
    quizPaginationItem,
  }
}
</script>
