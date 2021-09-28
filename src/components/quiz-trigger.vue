<template>
  <button
    class="quiz-trigger flex flex-col justify-center items-center rounded-lg py-3 px-2"
    @click="$emit('toggle-quiz')"
  >
    <img
      :src="triggerIcon"
      alt="Иконка квартиры"
      class="quiz-trigger__icon mb-1 sm:mb-2"
    >

    <span class="quiz-trigger__label text-center text-quiz-white text-xs sm:text-sm">
      {{ triggerText }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    triggerText: {
      type: String,
      default: 'Подобрать квартиру',
    },
    triggerIcon: {
      type: String,
      default: '',
    },
  }
}
</script>
