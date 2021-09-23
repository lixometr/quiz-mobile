<template>
  <div class="quiz-page flex-shrink-0 flex flex-col sm:px-4">
    <h3
      class="quiz-page__title text-quiz-white text-xl md:text-2xl font-extrabold pr-3"
      :class="titleClass"
    >
      {{ title }}
    </h3>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: [String, Object],
      default: '',
    },
  }
}
</script>
