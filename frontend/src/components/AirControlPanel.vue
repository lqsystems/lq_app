<template>
  <ControlPanel
    label="Air"
  >
    <ControlPanelItem
      label="Power"
      :include-divider="false"
    >
      <SwitchControl
        :initial-state="false"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
