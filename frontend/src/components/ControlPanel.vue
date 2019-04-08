<template>
  <div
    class="control-panel-wrapper"
    @click="handleClick"
  >
    <BaseCard class="control-panel-main">
      <div class="control-panel-title">
        {{ title + " Control" }}
      </div>
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
    title: {
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
@import '../styles/variables';

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

.control-panel-main {
  padding: 1em;
  background-color: $panel-background-color;
  opacity: $panel-background-opacity;
}

.control-panel-title{
  font-size: 1.65em;
  padding-bottom: .7em;
  text-align: center;
}
</style>
