<template>
  <div class="quiz-form-page">
    <h4 class="quiz-form-page__title text-base font-normal text-quiz-white mb-5">
      {{ title }}
    </h4>

    <input
      type="tel"
      class="quiz-form-page__input p-4 rounded-lg outline-none text-lg font-bold block"
      placeholder="+7"
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    }
  }
}
</script>
