<!-- Returns a range slider (with two handles) if an array is supplied for the level prop  -->
<!-- Returns a normal slider (one handle) if a scalar is supplid to the level prop -->
<template>
  <div class="slider-control">
    <div class="slider-control-slider">
      <!-- Do I need the value prop belo0w ? -->
      <BaseSlider
        v-if="!isFetching"
        :slider-position="level"
        :limits="limits"
        :color="color"
        @slider-move="handleSliderMove"
        @slider-move-end="handleSliderMoveEnd"
      />
    </div>
    <div class="slider-control-level">
      {{ levelLabel }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BaseSlider from './BaseSlider';
import { COLOR_PRIMARY } from '../constants/style.constants';

export default {
  name: 'SliderControl',
  components: {
    BaseSlider,
  },
  props: {
    level: {
      type: [Number, Array],
      required: true,
    },
    limits: {
      type: Array,
      default: () => [0, 100],
    },
    levelLabelFunc: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      sliderPosition: this.level,
    };
  },
  computed: {
    // TODO: refactor so that this is supplied as a prop
    ...mapState({
      isFetching: state => state.modules.isFetching,
    }),
    levelLabel() {
      return this.levelLabelFunc(this.sliderPosition);
    },
  },
  created() {
    this.color = COLOR_PRIMARY;
  },
  methods: {
    handleSliderMove(pos) {
      this.sliderPosition = pos;
    },
    handleSliderMoveEnd(pos) {
      this.$emit('slider-move-end', pos);
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
  width: 30em;
}

.slider-control-level {
  margin-left: 1.8em;
  width: 8em;
  text-align: center;
}
</style>
