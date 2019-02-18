<template>
  <ControlPanel
    label="Environment Controls"
    v-bind:handle-click="routeToControls"
  >
    <div>
      <v-icon class="status-panel-icon">
        edit
      </v-icon>
      <ControlPanelItem label="Air">
        <span>ON</span>
      </ControlPanelItem>
      <ControlPanelItem label="Light">
        <span>ON</span>
      </ControlPanelItem>
      <ControlPanelItem
        label="Heater"
        v-bind:include-divider="false"
      >
        <span>OFF</span>
      </ControlPanelItem>
    </div>
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
    routeToControls() {
      this.$router.push('rc');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
