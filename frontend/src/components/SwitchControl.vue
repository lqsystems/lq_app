<template>
  <div class="power-control">
    <div class="power-control-switch">
      <BaseSwitch
        :is-disabled="isDisabled"
        :is-on="isOn"
        :color="color"
        @toggle="handleToggle"
      />
    </div>
  </div>
</template>

<script>
import BaseSwitch from './BaseSwitch';
import { COLOR_PRIMARY } from '../constants/style.constants';

// TODO: refactor name to switch control
export default {
  name: 'SwitchControl',
  components: {
    BaseSwitch,
  },
  props: {
    isOn: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.color = COLOR_PRIMARY;
  },
  methods: {
    handleToggle() {
      this.$emit('toggle', !this.isOn);
    },
  },
};
</script>

<style>
.power-control {
  display: flex;
  align-items: center;
}

.power-control-switch {
  margin-left: 0.9em;
}

.power-control-state {
  width: 30px;
}
/* TODO: create descriptive scss variables for colors */
/* TODO: refactor to use scss nesting */
.power-control-state.is-on {
  color: #4fc08d;
}

.power-control-state.is-off {
  color: grey;
}

</style>
