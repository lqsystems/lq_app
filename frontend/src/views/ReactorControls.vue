<template>
  <div
    v-if="!isFetching"
    class="reactor-controls view"
  >
    <BaseHeader />
    <div class="rc-main">
      <div class="rc-sidebar">
        <BaseSidebar>
          <SidebarReactorItem
            :active-module="selectedModuleName"
            title="Prime1"
            @clicked="updateSelectedModule"
          />
          <SidebarReactorItem
            :active-module="selectedModuleName"
            title="Prime2"
            @clicked="updateSelectedModule"
          />
          <v-divider />
          <div class="rc-sidebar-items">
            <BaseSidebarItem
              title="Temp"
              icon-name="icon-fire"
              :active="selectedControlPanel === 'Heater'"
              :handle-click="SET_HEATER_ACTIVE"
            />
            <BaseSidebarItem
              title="Air"
              icon-name="icon-air"
              :active="selectedControlPanel === 'Air'"
              :handle-click="SET_AIR_ACTIVE"
            />
            <BaseSidebarItem
              title="Light"
              icon-name="icon-sun"
              :active="selectedControlPanel === 'Light'"
              :handle-click="SET_LIGHT_ACTIVE"
            />
            <div>
              <BaseSidebarItem
                title="Pump"
                icon-name="icon-water"
                :active="selectedControlPanel === 'Pump'"
                :handle-click="SET_PUMP_ACTIVE"
              />
              <div class="pump-control-wrapper">
                <SidePumpControl />
              </div>
            </div>
          </div>
        </BaseSidebar>
      </div>
      <div class="rc-controls">
        <component :is="currentControlPanel" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  SET_AIR_ACTIVE,
  SET_HEATER_ACTIVE,
  SET_LIGHT_ACTIVE,
  SET_PUMP_ACTIVE,
  UPDATE_SELECTED_MODULE,
} from '@/store/mutations.types';

import BaseHeader from '@/components/BaseHeader';
import BaseNav from '@/components/BaseNav';
import BaseSidebar from '@/components/BaseSidebar';
import SidebarReactorItem from '@/components/SidebarReactorItem';
import BaseSidebarItem from '@/components/BaseSidebarItem';
import AirControlPanel from '@/components/AirControlPanel';
import HeaterControlPanel from '@/components/HeaterControlPanel';
import LightControlPanel from '@/components/LightControlPanel';
import SensorControlPanel from '@/components/SensorControlPanel';
import SidePumpControl from '@/components/SidePumpControl';

export default {
  components: {
    BaseHeader,
    BaseNav,
    BaseSidebar,
    SidebarReactorItem,
    BaseSidebarItem,
    AirControlPanel,
    HeaterControlPanel,
    LightControlPanel,
    SensorControlPanel,
    SidePumpControl,
  },
  computed: {
    // TODO: use map state for these
    ...mapGetters(['isFetching', 'selectedControlPanel', 'selectedModuleName']),
    currentControlPanel() {
      return `${this.selectedControlPanel}ControlPanel`;
    },
  },
  methods: {
    ...mapMutations([
      SET_PUMP_ACTIVE,
      SET_AIR_ACTIVE,
      SET_HEATER_ACTIVE,
      SET_LIGHT_ACTIVE,
      UPDATE_SELECTED_MODULE,
    ]),
    updateSelectedModule(module) {
      this.UPDATE_SELECTED_MODULE(module);
    },
    routeHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
// jj
.pump-control-wrapper {
  font-size: 1.2em;
  padding-left: 5em;
}

.reactor-controls {
  height: 100%;
}

.rc-header {
  background-color: $grey-300;
  padding: 20px 20px;
  font-size: 1.5em;

  .theme--light {
    &.v-btn {
      font-size: 1.4em;
      margin-right: 0.5em;
    }
  }
}

.rc-main {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 250px auto;
  grid-template-areas: "sidebar controls";
}

.rc-sidebar {
  grid-area: sidebar;
  padding-top: 1em;
}

.rc-sidebar-heading {
  font-size: 1.35em;
  font-weight: 500;
  background-color: $grey-200;
  padding: 0.5em 0.7em;
}

.rc-sensor-item {
  display: flex;
  font-size: 18.2px;
  font-weight: 400;
  padding: 1em 1.3em;
}

.rc-sensor-label {
  width: 66%;
}

.rc-controls {
  padding: 34px 60px;
  grid-area: controls;
}

.icon-air {
  font-size: 0.7em;
  position: relative;
  left: 0.1em;
}

.nav {
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
}
</style>
