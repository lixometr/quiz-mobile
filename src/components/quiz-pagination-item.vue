<template>
  <li
    tabindex="0"
    class="block flex-grow relative pb-2 rounded cursor-pointer"
    :class="{
      active: index === currentPage,
      visited: isVisited,
      'mr-2': index !== totalPages - 1,
    }"
  >
    <div
      class="text-sm text-center absolute font-bold whitespace-nowrap"
      :class="labelClass"
    >
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
    labelClass: {
      type: [String, Object],
      default: '',
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
