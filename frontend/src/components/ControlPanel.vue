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

<style lang="scss">
.reactor-main {
  .control-panel-wrapper {
    font-size: 1.2em;
  }
}
.control-panel-wrapper {
  font-size: 1.3em;
  width: 100%;
  margin: 0 auto;
}

.control-panel-label {
  font-size: 1.1em;
  padding-bottom: .7em;
}
</style>
