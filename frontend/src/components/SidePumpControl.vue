<template>
  <div>
    <div>Load</div>
    <SwitchControl
      :is-on="activeModuleState.water"
      :is-disabled="activeModuleState.extraction"
      @toggle="toggleLoad"
    />
    <div>Extract</div>
    <SwitchControl
      :is-on="activeModuleState.extraction"
      :is-disabled="activeModuleState.water"
      @toggle="toggleExtraction"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { UPDATE_MODULE_STATE } from '@/store/actions.types';
import SwitchControl from './SwitchControl';

export default {
  name: 'SidePumpControl',
  components: {
    SwitchControl,
  },
  computed: {
    ...mapGetters(['activeModuleState', 'mv1State', 'getApiUpdatePayload']),
  },
  created() {
    this.toggleLoad = this.togglePump('water');
    this.toggleExtraction = this.togglePump('extraction');
  },
  mounted() {
    console.log(this.getApiUpdatePayload);
  },
  methods: {
    ...mapActions([UPDATE_MODULE_STATE]),
    updateState(actuatorType, newState) {
      this.UPDATE_MODULE_STATE({
        actuatorType,
        newState,
      });
    },
    togglePump(pumpActionType) {
      return (newState) => {
        this.updateState(pumpActionType, newState);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
