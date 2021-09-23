<template>
  <footer class="quiz-body__footer quiz-footer mt-auto pb-4">
    <ul class="quiz-footer__pagination mb-6 flex w-100 pt-3">
      <quiz-pagination-item
        @click.native="paginationClickHandler(index)"

        :index="index"
        :is-visited="page.isVisited"
        :current-page="currentPage"
        :total-pages="pages.length"
        label-class="quiz-footer__paginatioon-label"
        class="quiz-footer__pagination-item"

        v-for="(page, index) in pages"
        :key="index"
      />
    </ul>

    <div
      class="flex"

      v-if="currentPage < 2"
    >
      <button
        @click="setCurrentPage(currentPage - 1)"

        class="quiz-footer__navigator quiz-footer__navigator_prev mr-2 rounded-md"
        :disabled="currentPage === 0"
      ></button>

      <button
        @click="setCurrentPage(currentPage + 1)"

        class="quiz-footer__navigator quiz-footer__navigator_next flex-grow rounded-md text-quiz-white text-left pl-8 font-medium text-lg"
      >
        Далее
      </button>
    </div>

    <template v-else-if="currentPage === 2">
      <button
        @click="sendUserData()"

        class="quiz-footer__navigator quiz-footer__navigator_submit w-full rounded-md text-quiz-white text-center px-2 font-medium text-lg mb-3"
      >
        Отправить
      </button>

      <p class="pl-5 pb-3 text-xs text-quiz-white">
        {{ agreementText }}
      </p>
    </template>
  </footer>
</template>

<script>
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
    pages: {
      type: Array,
      default: function(){
        return [];
      },
    },
    userData: {
      type: Object,
      default: function(){
        return {};
      }
    },
  },
  methods: {
    paginationClickHandler(index){
      if(this.pages[index].isVisited){
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
  components: {
    quizPaginationItem,
  }
}
</script>
