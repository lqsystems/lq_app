
<template>
  <ControlPanel
    label="Present Values"
  >
    <v-icon class="status-panel-icon">
      settings
    </v-icon>
    <ControlPanelItem label="Temp">
      <span class="pv-temp-val">32.876</span>
    </ControlPanelItem>
    <ControlPanelItem
      label="OD"
      v-bind:include-divider="false"
    >
      <span class="pv-temp-val">3.394</span>
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';

export default {
  name: 'HeaterControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
  },
  computed: {
    ...mapGetters(['heater']),
    heaterLevel() {
      return Number(this.heater.level);
    },
    heaterMinMax() {
      return [this.heater.minTemp, this.heater.maxTemp];
    },
  },
  created() {
    this.$store.dispatch('fetchEnvironmentState');
  },
  methods: {
    ...mapMutations(['toggleHeaterPower', 'updateHeaterLevel']),
    getSliderLabel(sliderPos) {
      return `${sliderPos}%`;
    },
    getTempLabel(sliderPos) {
      return `${sliderPos[0]} °C\u00A0\u00A0to\u00A0\u00A0${sliderPos[1]} °C`;
    },
    sayHi() {
      console.log('hello');
    },
  },
};
</script>

<style lang="scss" scoped>
.status-panel-icon {
  position: absolute;
  right: 1em;
}

</style>
