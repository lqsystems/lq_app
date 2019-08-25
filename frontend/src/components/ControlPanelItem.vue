<template>
  <div
    v-ripple="rippleOnClick"
    class="cp-item-wrapper"
    @click="handleClick"
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

<style lang="scss">
@import '../styles/variables';

.reactor-main {
  .cp-item {
    display: flex;
    padding: 1.0em 1.5em;
    align-items: center;
  }
}

.cp-item {
  // border: 1px solid lightgrey;
  color: $font-color-medium-contrast;
  display: flex;
  padding: 2.4em 1.2em;
  align-items: center;
  text-transform: uppercase;
}

.cp-item-wrapper {
  &.light {

  }
}

.cp-item-col-right {
  display: flex;
  flex-direction: row;
  margin-left: auto;
}

</style>
