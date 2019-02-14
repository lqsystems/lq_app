<template>
  <v-switch
    v-model="isOn"
    v-bind:color="color"
    v-on:change="$emit('handle-change')"
  />
</template>

<script>
export default {
  name: 'BaseSwitch',
  props: {
    switchOn: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOn: this.switchOn,
    };
  },
};
</script>

<style>
  .v-input {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .v-input__slot {
    margin-bottom: 0 !important;
  }

  .v-input--selection-controls__input {
    margin-right: 0 !important;
  }

  .v-input--selection-controls__ripple {
    margin: 0 !important;
  }
  .v-messages {
    min-height: 0 !important;
  }
</style>
