<template>
  <div class="control-panel-wrapper">
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
  },
};
</script>

<style>
.control-panel-wrapper {
  width: 600px;
  margin: 0 auto;
}
.control-panel-label {
  font-size: 1.2em;
  padding-bottom: .7em;
}
</style>
