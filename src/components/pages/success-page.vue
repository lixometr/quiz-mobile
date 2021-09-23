<template>
  <div class="success-page flex flex-col items-center flex-grow">
    <h4 class="text-quiz-white text-2xl font-extrabold mb-4">
      {{ title }}
    </h4>

    <img
      src="../../assets/img/success-img.png"
      class="block success-page__img"
      :alt="title"
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
