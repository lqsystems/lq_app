<template>
  <div
    v-ripple="rippleOnClick"
    class="cp-item-wrapper"
    v-on:click="handleClick"
  >
    <div class="cp-item">
      <div class="cp-item-col cp-item-col-left">
        <div class="cp-item-label">
          {{ label }}
        </div>
      </div>
      <div class="cp-item-col cp-item-col-right">
        <slot />
      </div>
    </div>
    <BaseDivdier v-if="includeDivider" />
  </div>
</template>

<script>
import BaseDivdier from './BaseDivider';

export default {
  name: 'ControlPanelItem',
  components: {
    BaseDivdier,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    includeDivider: {
      type: Boolean,
      default: true,
    },
    rippleOnClick: {
      type: Boolean,
      default: false,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style>
.cp-item {

  display: flex;
  padding: 1.3em 1.2em;
  align-items: center;
}

.cp-item-col-right {
  display: flex;
  flex-direction: row;
  margin-left: auto;
}
</style>
