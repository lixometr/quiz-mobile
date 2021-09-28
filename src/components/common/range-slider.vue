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

    <div
      class="range-slider__track flex-grow"
      ref="rangeSliderTrack"
    >
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
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('touchstart', this.handleMouseDown);

    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchend',this.handleMouseUp);
  },
  methods: {
    constrain(val, min, max){
      return val > max ? max : val < min ? min : val;
    },
    handleMouseDown(event){
      if(event.target.isEqualNode(this.$refs.rangeSliderKnob)){
        this.isMouseDown = true;

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('touchmove', this.handleMouseMove);
      }
    },
    handleMouseUp(){
      this.isMouseDown = false;

      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('touchmove', this.handleMouseMove);
    },
    handleMouseMove(event){
      if(this.isMouseDown){
        const clickX = event.type === 'mousemove' ? event.x : event.changedTouches[0].clientX;
        const knob = this.$refs.rangeSliderKnob;
        const rangeSliderTrack = this.$refs.rangeSliderTrack;

        const knobWidth = knob.getBoundingClientRect().width;

        const absoluteKnobLeft = clickX;
        const absoluteRangeSliderTrackLeft = rangeSliderTrack.getBoundingClientRect().left;
        const rangeSliderTrackWidth = rangeSliderTrack.getBoundingClientRect().width;

        const knobLeftPersentage = (absoluteKnobLeft - absoluteRangeSliderTrackLeft - knobWidth / 6) / rangeSliderTrackWidth;

        this.setValue((this.minValue - this.maxValue) * (1 - knobLeftPersentage) + this.maxValue);
      }
    },
    setValue(value){
      this.cValue = this.constrain(Math.ceil(value), this.minValue, this.maxValue);

      this.$emit('input', this.cValue);
    },
  },
  computed: {
    progressPersentage(){
      return ((this.value - this.minValue) / (this.maxValue - this.minValue)) * 100;
    }
  }
}
</script>
