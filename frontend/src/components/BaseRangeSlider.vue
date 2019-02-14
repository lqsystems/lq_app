<template>
  <v-range-slider
    v-model="sliderPositions"
    v-bind:value="levels"
    v-bind:color="color"
    thumb-label
    v-on:input="$emit('slider-move', sliderPositions)"
  />
</template>

<script>
export default {
  name: 'BaseRangeSlider',
  props: {
    levels: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sliderPositions: [this.levels[0], this.levels[1]],
    };
  },
};
</script>

<style>
</style>
