<template>
  <v-switch
    :input-value="isOn"
    :color="color"
    @change="$emit('toggle')"
  />
</template>

<script>
export default {
  name: 'BaseSwitch',
  props: {
    isOn: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
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
