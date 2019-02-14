<template>
  <SliderControlTemplate level-label="25">
    <BaseRangeSlider
      v-bind:min-val="20"
      v-bind:max-val="80"
      v-on:slider-move="updateslidersliderPosition"
    />
  </SliderControlTemplate>
</template>

<script>
import BaseRangeSlider from './BaseRangeSlider';
import SliderControlTemplate from './SliderControlTemplate';

export default {
  name: 'RangeSliderControl',
  components: {
    BaseRangeSlider,
    SliderControlTemplate,
  },
  data() {
    return {
      slidersliderPosition: 0,
    };
  },
  computed: {
    levelLabel() {
      return this.levelLabelFunc(this.slidersliderPosition);
    },
  },
  methods: {
    updateslidersliderPosition(pos) {
      console.log(pos);
      this.slidersliderPosition = pos;
    },
  },
};
</script>

<style>
</style>
