<!-- Returns a Range Slider if an array is supplied for the level prop  -->
<!-- Returns a normal slider if a scalar is supplid to the level prop -->
<template>
  <div class="slider-control">
    <div class="slider-control-slider">
      <BaseRangeSlider
        v-if="Array.isArray(level)"
        v-bind:levels="level"
        v-bind:color="color"
        v-on:slider-move="emitSliderPosition"
      />
      <BaseSliderNoUi
        v-else
        v-bind:value="sliderPosition"
        v-bind:color="color"
        v-on:slider-move="emitSliderPosition"
      />
    </div>
    <div class="slider-control-level">
      {{ levelLabel }}
    </div>
  </div>
</template>

<script>
import BaseSliderNoUi from './BaseSliderNoUi';
import BaseRangeSlider from './BaseRangeSlider';
import { COLOR_PRIMARY } from '../constants/StyleConstants';

export default {
  name: 'SliderControl',
  components: {
    BaseSliderNoUi,
    BaseRangeSlider,
  },
  props: {
    level: {
      type: [Number, Array],
      required: true,
    },
    levelLabelFunc: {
      type: Function,
      required: true,
    },
  },
  // TODO: consider if there is a better design that allows this component not to have state
  data() {
    return {
      sliderPosition: this.level,
    };
  },
  computed: {
    levelLabel() {
      return this.levelLabelFunc(this.sliderPosition);
    },
  },
  created() {
    this.color = COLOR_PRIMARY;
  },
  methods: {
    emitSliderPosition(pos) {
      this.sliderPosition = pos;
      this.$emit('slider-move', pos);
    },
  },
};
</script>

<style>
/* TODO: fix bug where slider jumps to left at 100% */
.slider-control {
  display: flex;
  align-items: center;
}

.slider-control-slider {
  width: 300px;
}

.slider-control-level {
  margin-left: 20px;
  width: 110px;
  text-align: center;
}
</style>
