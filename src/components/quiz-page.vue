<template>
  <div class="quiz-page flex-grow">
    <h3
      class="quiz-page__title text-quiz-white text-2xl font-extrabold"
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
