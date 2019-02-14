<template>
  <v-slider
    v-model="sliderPosition"
    v-bind:value="value"
    v-bind:color="color"
    thumb-label
    v-on:input="$emit('slider-move', sliderPosition)"
  />
</template>

<script>
export default {
  name: 'BaseSlider',
  props: {
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sliderPosition: this.value,
    };
  },
};
</script>

<style>
</style>
