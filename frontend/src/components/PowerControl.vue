<template>
  <div class="power-control">
    <div
      class="power-control-state"
      v-bind:class="[powerOn ? 'is-on' : 'is-off']"
    >
      <span
        v-if="powerOn"
      >
        ON
      </span>
      <span v-else>
        OFF
      </span>
    </div>
    <div class="power-control-switch">
      <BaseSwitch
        v-bind:switch-on="powerOn"
        v-bind:color="color"
        v-on:handle-change="$emit('toggle-power')"
      />
    </div>
  </div>
</template>

<script>
import BaseSwitch from './BaseSwitch';
import { COLOR_PRIMARY } from '../constants/StyleConstants';

// TODO: refactor name to switch control
export default {
  name: 'PowerControl',
  components: {
    BaseSwitch,
  },
  props: {
    powerOn: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.color = COLOR_PRIMARY;
  },
};
</script>

<style>
.power-control {
  display: flex;
  align-items: center;
}

.power-control-switch {
  margin-left: 10px;
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
