<template>
  <ControlPanel
    title="Sensors"
  >
    <ControlPanelItem
      label="State"
      :include-divider="false"
    >
      <SwitchControl
        :is-on="isOn"
        @toggle="sayHi"
      />
    </ControlPanelItem>
  </ControlPanel>
</template>

<script>
/*

*/
import { mapGetters, mapActions } from 'vuex';

import ControlPanel from './ControlPanel';
import ControlPanelItem from './ControlPanelItem';
import SwitchControl from './SwitchControl';


export default {
  name: 'SensorControlPanel',
  components: {
    ControlPanel,
    ControlPanelItem,
    SwitchControl,
  },
  data() {
    return {
      isOn: false,
    };
  },
  methods: {
    sayHi() {
      console.log('hello');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
