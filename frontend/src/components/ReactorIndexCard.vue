<template>
  <BaseCard class="reactor-card">
    <div class="reactor-card-data">
      <div class="reactor-card-temp">
        <span class="reactor-card-temp-val">31.3</span>
        <span class="reactor-card-data-unit reactor-card-temp-unit">°C</span>
      </div>
      <div class="divider-horiz" />
      <div class="reactor-card-od">
        <span class="reactor-card-od-val">3.67</span>
        <span class="reactor-card-data-unit reactor-card-od-unit">OD</span>
      </div>
    </div>
    <div class="reactor-card-title">
      MV1
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
};
</script>
<style lang='scss' scoped>
@import '../styles/variables';
$reactor-card-accent-color: lightseagreen;

.reactor-card {
  background-color: $color-panel-background;
  display: inline-block;
  padding: 1.5em 2em;
  border-bottom: 3px solid $reactor-card-accent-color;
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

.divider-horiz {
  border-right: 2px solid $reactor-card-accent-color;
  margin: 0 1em;
}
</style>
