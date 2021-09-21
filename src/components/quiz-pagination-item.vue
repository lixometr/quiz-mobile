<template>
  <li
    tabindex="0"
    class="quiz-body__pagination-item block flex-grow relative pb-2 rounded cursor-pointer"
    :class="{
      active: index === currentPage,
      visited: isVisited,
      'mr-2': index !== totalPages - 1,
    }"
  >
    <div class="quiz-body__paginatioon-label text-sm text-quiz-white text-center absolute font-bold">
      {{ `${index + 1} из ${totalPages}` }}
    </div>
  </li>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    isVisited: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
