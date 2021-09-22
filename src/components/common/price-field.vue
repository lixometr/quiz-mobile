<template>
  <div class="apartment-price__field rounded-lg px-4 py-4 font-bold text-lg">
    <span class="apartment-price__field-price">
      {{ formattedChosenPrice }}
    </span>

    <span class="apartment-price__field-symbol opacity-40">
      ₽
    </span>
  </div>
</template>

<script>
export default {
  props: {
    chosenPrice: {
      type: [String, Number],
      default: 0,
    }
  },
  computed: {
    formattedChosenPrice(){
      return String(this.chosenPrice)
        .split('')
        .reverse()
        .reduce((total, current, index) => total += index % 3 ? current : ` ${current}`, '')
        .split('')
        .reverse()
        .join('');
    }
  }
}
</script>
