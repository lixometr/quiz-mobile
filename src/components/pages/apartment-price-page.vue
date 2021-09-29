<template>
  <div class="apartment-price">
    <price-field
      :chosen-price="chosenPrice"
      :is-error="isError"
      class="mb-11"
    />

    <range-slider
      @input="updateChosenPrice($event)"

      :min-value="sliderData.minValue"
      :max-value="sliderData.maxValue"
      :value="chosenPrice"
    />
  </div>
</template>

<script>
import priceField from '../common/price-field.vue'
import rangeSlider from '../common/range-slider.vue'

export default {
  props: {
    sliderData: {
      type: Object,
      default: function(){
        return {};
      }
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      chosenPrice: this.sliderData.value,
    }
  },
  methods: {
    updateChosenPrice(price){
      this.chosenPrice = price;

      this.$emit('update-range-pages', price);
    },
  },
  watch: {
    sliderData(newData){
      this.updateChosenPrice(newData.value);
    },
  },
  components: {
    priceField,
    rangeSlider,
  }
}
</script>
