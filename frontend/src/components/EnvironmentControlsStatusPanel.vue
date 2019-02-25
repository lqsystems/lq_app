<template>
  <ControlPanel
    label="Environment Controls"
    v-bind:handle-click="routeToControls"
  >
    <div>
      <v-icon class="status-panel-icon">
        edit
      </v-icon>
      <ControlPanelItem
        v-bind:handle-click="sayHi"
        ripple-on-click
        label="Air"
      >
        <span>ON</span>
      </ControlPanelItem>
      <ControlPanelItem
        ripple-on-click
        label="Light"
      >
        <span>ON</span>
      </ControlPanelItem>
      <ControlPanelItem
        ripple-on-click
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
  name: 'EnvironmentControlsStatusPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapMutations(['toggleHeaterPower', 'setHeaterLevel']),
    routeToControls() {
      this.$router.push('reactor-controls');
    },
    sayHi() {
      console.log('hello');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
