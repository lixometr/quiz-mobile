<template>
  <div class="apartment-price">
    <price-field
      :chosen-price="chosenPrice"
      class="mb-11"
    />

    <range-slider
      @input="chosenPrice = $event"

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
    }
  },
  data(){
    return {
      chosenPrice: this.sliderData.value,
    }
  },
  components: {
    priceField,
    rangeSlider,
  }
}
</script>
