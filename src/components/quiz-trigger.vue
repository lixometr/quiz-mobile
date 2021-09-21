<template>
  <button
    class="quiz-trigger flex flex-col justify-center items-center rounded-lg"
    @click="$emit('toggle-quiz')"
  >
    <img
      src="../assets/img/building-icon.svg"
      alt="Иконка квартиры"
      class="quiz-trigger__icon mb-2"
    >

    <span class="quiz-trigger__label text-center text-quiz-white">
      Подобрать квартиру
    </span>
  </button>
</template>

<script>

</script>
