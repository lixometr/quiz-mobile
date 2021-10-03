<template>
  <div class="flex flex-col apartment-types-page">
    <custom-checkbox
      @update:is-checked="chooseApartment(index, $event)"

      :is-checked="type.isChecked"
      :is-available="isAvailableToCheck"
      :is-error="isError"
      :class="{
        'mb-3': index !== cApartmentTypes.length - 1
      }"

      v-for="(type, index) in cApartmentTypes"
      :key="index"
    >
      {{ type.type }}
    </custom-checkbox>
  </div>
</template>

<script>
import customCheckbox from '../common/custom-checkbox.vue';

export default {
  props: {
    apartmentTypes: {
      type: Array,
      default: function(){
        return [];
      }
    },
    isError: {
      type: Boolean,
      default: false,
    },
    maxQuestionLength: {
      type: Number,
      default: 0,
    },
  },
  data(){
    return {
      cApartmentTypes: this.apartmentTypes,
      isAvailableToCheck: true,
    }
  },
  methods: {
    chooseApartment(index, state){
      this.cApartmentTypes[index].isChecked = state;

      // const chosenTypesLength = this.cApartmentTypes.filter(t => t.isChecked).length;

      // // if(chosenTypesLength > this.maxQuestionLength){
      // //   this.cApartmentTypes[index].isChecked = true;

      // //   this.$nextTick(() => {
      // //     this.cApartmentTypes[index].isChecked = false;
      // //   })

      // //   return;
      // // }

      const chosenTypes = this.cApartmentTypes
        .map((type, index) => type.isChecked ? index : null)
        .filter(type => type !== null);

      this.$emit('chosen-apartments-change', chosenTypes);
    }
  },
  watch: {
    apartmentTypes(newTypes){
      this.cApartmentTypes = [...newTypes];
    }
  },
  components: {
    customCheckbox,
  }
}
</script>
