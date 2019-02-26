<template>
  <div class="power-control">
    <div
      class="power-control-state"
      v-bind:class="[isOn ? 'is-on' : 'is-off']"
    >
      <span
        v-if="isOn"
      >
        ON
      </span>
      <span v-else>
        OFF
      </span>
    </div>
    <div class="power-control-switch">
      <BaseSwitch
        v-bind:is-on="isOn"
        v-bind:color="color"
        v-on:toggle="handleToggle"
      />
    </div>
  </div>
</template>

<script>
import BaseSwitch from './BaseSwitch';
import { COLOR_PRIMARY } from '../constants/StyleConstants';

// TODO: refactor name to switch control
export default {
  name: 'SwitchControl',
  components: {
    BaseSwitch,
  },
  props: {
    initialState: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isOn: this.initialState,
    };
  },
  created() {
    this.color = COLOR_PRIMARY;
  },
  methods: {
    handleToggle() {
      this.$emit('toggle', !this.isOn);
      this.isOn = !this.isOn;
    },
  },
};
</script>

<style>
.power-control {
  display: flex;
  align-items: center;
  padding-right: 1.1em;
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
