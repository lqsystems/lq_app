<template>
  <ControlPanel
    label="Environment Controls"
    :handle-click="routeToControls"
  >
    <div>
      <!-- <v-icon class="status-panel-icon">
        edit
      </v-icon> -->
      <ControlPanelItem
        :handle-click="SET_AIR_ACTIVE"
        ripple-on-click
        label="Air"
      >
        <span>ON</span>
      </ControlPanelItem>
      <ControlPanelItem
        :handle-click="SET_LIGHT_ACTIVE"
        ripple-on-click
        label="Light"
      >
        <span>ON</span>
      </ControlPanelItem>
      <ControlPanelItem
        :handle-click="SET_HEATER_ACTIVE"
        ripple-on-click
        label="Heater"
        :include-divider="false"
      >
        <span>OFF</span>
      </ControlPanelItem>
    </div>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  SET_AIR_ACTIVE,
  SET_LIGHT_ACTIVE,
  SET_HEATER_ACTIVE,
} from '@/store/mutations.types';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';

export default {
  name: 'EnvironmentControlsStatusPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
  },
  computed: {
    ...mapGetters([
    ]),
  },
  methods: {
    ...mapMutations([
      SET_AIR_ACTIVE,
      SET_LIGHT_ACTIVE,
      SET_HEATER_ACTIVE,
    ]),
    routeToControls() {
      this.$router.push('reactor-controls');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
