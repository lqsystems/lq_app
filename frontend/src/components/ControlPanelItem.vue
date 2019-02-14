<template>
  <div class="cp-item-wrapper">
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
  },
};
</script>

<style>
.cp-item {
  display: flex;
  padding: 1.5em 1.3em;
  align-items: center;
}

.cp-item-col-right {
  display: flex;
  flex-direction: row;
  margin-left: auto;
}
</style>
