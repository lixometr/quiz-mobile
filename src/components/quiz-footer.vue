<template>
  <footer class="quiz-body__footer quiz-footer mt-auto pb-4">
    <ul class="quiz-footer__pagination mb-6 flex w-100 pt-3">
      <quiz-pagination-item
        @click.native="setCurrentPage(index)"

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

    <div class="flex w-100">
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
    pages: {
      type: Array,
      default: function(){
        return [];
      },
    },
  },
  methods: {
    setCurrentPage(page){
      this.$emit('set-current-page', page)
    }
  },
  components: {
    quizPaginationItem,
  }
}
</script>
