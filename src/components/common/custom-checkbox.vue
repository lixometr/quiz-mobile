<template>
  <label class="quiz-checkbox flex items-center select-none cursor-pointer">
    <input
      @input="updateIsChecked($event)"

      type="checkbox"
      class="quiz-checkbox__input invisible absolute opacity-0"

      :name="checkboxName"
      :checked="isChecked"
    >

    <div
      class="quiz-checkbox__fake rounded-lg mr-6"
      :class="{
        'invalid': isError,
      }"
    ></div>

    <span class="quiz-checkbox__text font-bold text-quiz-value text-lg">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    checkboxName: {
      type: String,
      default: 'quiz-checkbox',
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    updateIsChecked(event){
      const state = event.target.checked;

      this.$emit('update:is-checked', state);
    }
  },
}
</script>
