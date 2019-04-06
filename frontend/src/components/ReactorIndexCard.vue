<template>
  <BaseCard
    class="reactor-card"
    :class="`reactor-card-${reactorTitle}`"
  >
    <div @click="onClick">
      <div
        class="reactor-card-data"
      >
        <div class="reactor-card-temp">
          <span class="reactor-card-temp-val">{{ sensorData.temperature }}</span>
          <span class="reactor-card-data-unit reactor-card-temp-unit">°C</span>
        </div>
        <div class="divider-horizontal" />
        <div class="reactor-card-od">
          <span class="reactor-card-od-val">{{ sensorData.OD }}</span>
          <span class="reactor-card-data-unit reactor-card-od-unit">OD</span>
        </div>
      </div>
      <div class="reactor-card-title">
        {{ reactorTitle }}
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard';

export default {
  name: 'ReactorIndexCard',
  components: {
    BaseCard,
  },
  props: {
    sensorData: {
      type: Object,
      required: true,
    },
    reactorTitle: {
      type: String,
      required: true,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    onClick() {
      this.handleClick(this.reactorTitle);
    },
  },
};
</script>
<style lang='scss' scoped>
@import '../styles/variables';
$reactor-card-accent-color-1: lightseagreen;
$reactor-card-accent-color-2: lightcoral;

.reactor-card {
  margin: 2em;
  background-color: $panel-background-color;
  display: inline-block;
  padding: 1.5em 2em;
  border-bottom: 3px solid ;
  width: 300px;
}

.reactor-card-MV1 {
  border-bottom-color: $reactor-card-accent-color-1;

  .divider-horizontal {
    border-right: 2px solid $reactor-card-accent-color-1;
    margin: 0 1em;
  }
}

.reactor-card-ZeePrime {
  border-bottom-color: $reactor-card-accent-color-2;

  .divider-horizontal {
    border-right: 2px solid $reactor-card-accent-color-2;
    margin: 0 1em;
  }
}

.reactor-card-data {
  display: flex;
  justify-content: center;
  font-size: 2.5em;
  margin-bottom: 3em;
}

.reactor-card-data-unit {
  vertical-align: super;
  font-size: .5em;
}

.reactor-card-title {
  font-size: 1.9em;
}

</style>
