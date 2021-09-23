<template>
  <div
    class="range-slider flex items-center"
  >
    <div
      class="range-slider__stop rounded-full"
      :class="{
        'range-slider__stop_active': value >= minValue,
      }"
    ></div>

    <div class="range-slider__track flex-grow">
      <div
        class="range-slider__progress"
        :style="{
          '--prgress-scale-x': `${progressPersentage}%`
        }"
      >
        <div
          class="range-slider__knob"
          ref="rangeSliderKnob"
        ></div>
      </div>
    </div>

    <div
      class="range-slider__stop rounded-full"
      :class="{
        'range-slider__stop_active': value === maxValue,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data(){
    return {
      cValue: this.value,
      isMouseDown: false,
    }
  },
  mounted(){
    const setMouseState = state => {
      this.isMouseDown = state;
    }

    document.addEventListener('mousedown', event => this.handleMouseClick.call(this, event));
    document.addEventListener('touchstart', event => this.handleMouseClick.call(this, event), false);

    document.addEventListener('mouseup', setMouseState.bind(this, false));
    document.addEventListener('touchend', setMouseState.bind(this, false), false);

    document.addEventListener('mousemove', event => this.handleMouseMove.call(this, event));
    document.addEventListener('touchmove', event => this.handleMouseMove.call(this, event), false);
  },
  methods: {
    constrain(val, min, max){
      return val > max ? max : val < min ? min : val;
    },
    handleMouseClick(event){
      if(event.target.isEqualNode(this.$refs.rangeSliderKnob)){
        this.isMouseDown = true;
      }
    },
    handleMouseMove(event){ // TODO: slightly strange behaviour
      if(this.isMouseDown){
        const clickX = event.x;
        const knob = event.target;
        const rangeSliderTrack = knob.parentNode.parentNode;

        const knobWidth = knob.getBoundingClientRect().width;

        const absoluteKnobLeft = clickX;
        const absoluteRangeSliderTrackLeft = rangeSliderTrack.getBoundingClientRect().left;
        const rangeSliderTrackWidth = rangeSliderTrack.getBoundingClientRect().width;

        const knobLeftPersentage = (absoluteKnobLeft - absoluteRangeSliderTrackLeft - knobWidth / 6) / rangeSliderTrackWidth;

        this.setValue(this.maxValue * knobLeftPersentage);
      }
    },
    setValue(value){
      this.cValue = this.constrain(Math.ceil(value), this.minValue, this.maxValue);

      this.$emit('input', this.cValue);
    },
  },
  computed: {
    progressPersentage(){
      return (this.value / this.maxValue) * 100;
    }
  }
}
</script>
