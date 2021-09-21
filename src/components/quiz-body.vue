<template>
  <div class="quiz-body rounded-lg px-6 pt-6 flex flex-col">
    <button
      @click="$emit('toggle-quiz')"
      class="quiz-body__close ml-auto"
    ></button>

    <main class="quiz-body__track flex">
      <quiz-page
        title="Какой тип квартиры вас интересует?"
        class="quiz-body__page"

        title-class="mb-16"
      >

      </quiz-page>
    </main>

    <footer
      class="quiz-body__footer mt-auto pb-4"

      v-if="currentPage !== pagesArr.length - 1 || true"
    >
      <ul class="quiz-body__pagination mb-6 flex w-100 pt-3">
        <quiz-pagination-item
          @click.native="setCurrentPage(index)"

          :index="index"
          :is-visited="page.isVisited"
          :current-page="currentPage"
          :total-pages="pagesArr.length"


          v-for="(page, index) in pagesArr"
          :key="index"
        />
      </ul>

      <div class="flex w-100">
        <button
          @click="setCurrentPage(currentPage - 1)"

          class="quiz-body__navigator quiz-body__navigator_prev mr-2 rounded-md"
          :disabled="currentPage === 0"
        ></button>

        <button
          @click="setCurrentPage(currentPage + 1)"

          class="quiz-body__navigator quiz-body__navigator_next flex-grow rounded-md text-quiz-white text-left pl-8 font-medium text-lg"
        >
          Далее
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import quizPage from './quiz-page.vue';
import quizPaginationItem from './quiz-pagination-item.vue';

export default {
  data(){
    return {
      currentPage: 0,
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
    quizPage,
    quizPaginationItem,
  }
}
</script>
