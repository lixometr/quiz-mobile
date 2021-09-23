<template>
  <div class="flex flex-col">
    <custom-checkbox
      @update:is-checked="chooseApartment(index, $event)"

      :is-checked="type.isChecked"
      :is-error="isError"
      :class="{
        'mb-3': index !== cApartmentTypes.length - 1
      }"

      v-for="(type, index) in cApartmentTypes"
      :key="index"
    >
      {{ type.title }}
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
  },
  data(){
    return {
      cApartmentTypes: this.apartmentTypes,
    }
  },
  methods: {
    chooseApartment(index, state){
      this.cApartmentTypes[index].isChecked = state;

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
