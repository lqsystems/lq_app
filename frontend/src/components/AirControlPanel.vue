<template>
  <ControlPanel
    label="Air"
  >
    <ControlPanelItem
      label="Power"
      :include-divider="false"
    >
      <SwitchControl
        :initial-state="air"
        @toggle="toggleAir"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { UPDATE_MODULE_STATE } from '@/store/actions.types';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';


export default {
  name: 'AirControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    SwitchControl,
  },
  computed: {
    ...mapGetters(['air']),
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE]),
    toggleAir(airState) {
      this.UPDATE_MODULE_STATE({
        actuatorType: 'Air',
        newState: airState,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
