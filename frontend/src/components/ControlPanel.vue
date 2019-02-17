<template>
  <div
    class="control-panel-wrapper"
    v-on:click="handleClick"
  >
    <div class="control-panel-label">
      {{ label }}
    </div>
    <BaseCard class="control-panel-main">
      <slot />
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from './BaseCard';

export default {
  name: 'ControlPanel',
  components: {
    BaseCard,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.control-panel-wrapper {
  font-size: 1.1em;
  width: 90%;
  margin: 0 auto;
}

.control-panel-label {
  font-size: 1.2em;
  padding-bottom: .7em;
}
</style>
