<template>
  <div class="quiz-form-page">
    <h4 class="quiz-form-page__title text-base font-normal text-quiz-white mb-5">
      {{ title }}
    </h4>

    <input
      @input="mask($event)"
      @focus="mask($event)"
      @blur="mask($event)"

      type="tel"
      ref="maskedInput"
      placeholder="+7"
      class="quiz-form-page__input p-4 rounded-lg outline-none text-lg font-bold block"

      :class="{
        'invalid': isError,
      }"
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    mask(event) {
      let i = 0;
      const matrix = '+7 (___) ___ __ __';
      const def = matrix.replace(/\D/g, '');
      let val = event.target.value.replace(/\D/g, '');

      const setCursorPosition = (pos, elem) => {
        elem.focus();
        if (elem.setSelectionRange){
          elem.setSelectionRange(pos, pos);
        }

        else if (elem.createTextRange) {
          const range = elem.createTextRange();

          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      }

      if (def.length >= val.length) val = def;

      event.target.value = matrix.replace(/./g, a => {
        return /[_\d]/g.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type == 'blur') {
        if (event.target.value.length == 2) event.target.value = '';
      }
      else{
        setCursorPosition(event.target.value.length, this.$refs.maskedInput);
      }

      this.$emit('user-phone-change', event.target.value);
    },
  },
}
</script>
