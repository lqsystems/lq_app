<template>
  <div
    v-if="!isFetching"
    class="reactor-controls view"
  >
    <BaseHeader />
    <div class="rc-main">
      <div class="rc-sidebar">
        <BaseSidebar>
          <BaseSidebarItem
            img-icon
            sensor-reading
            title="Prime1"
            icon-name="icon-fire"
            :active="selectedModuleName === 'Prime1'"
            :handle-click="setPrime1Active"
          />
          <BaseSidebarItem
            img-icon
            sensor-reading
            title="Prime2"
            icon-name="icon-fire"
            :active="selectedModuleName === 'Prime2'"
            :handle-click="setPrime2Active"
          />
          <div class="line" />
          <div class="sb-divider">
            CONTROLS
          </div>
          <div class="rc-sidebar-items">
            <BaseSidebarItem
              title="Heat"
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
            <!-- <div class="sb-divider"> LIQUIDS </div> -->
            <div class="line" />
            <div>
              <BaseSidebarItem
                title="Liquid"
                icon-name="icon-water"
                :active="selectedControlPanel === 'Pump'"
                :handle-click="SET_PUMP_ACTIVE "
              />
              <!-- <BaseCard
                v-if="showPumpControls"
                class="pump-control-wrapper"
              >
                <SidePumpControl />
              </BaseCard> -->
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

import BaseCard from '@/components/BaseCard';
import BaseHeader from '@/components/BaseHeader';
import BaseNav from '@/components/BaseNav';
import BaseSidebar from '@/components/BaseSidebar';
import SidebarReactorItem from '@/components/SidebarReactorItem';
import BaseSidebarItem from '@/components/BaseSidebarItem';
import AirControlPanel from '@/components/AirControlPanel';
import HeaterControlPanel from '@/components/HeaterControlPanel';
import LightControlPanel from '@/components/LightControlPanel';
import PumpControlPanel from '@/components/PumpControlPanel';
import SensorControlPanel from '@/components/SensorControlPanel';
import SidePumpControl from '@/components/SidePumpControl';

export default {
  components: {
    AirControlPanel,
    BaseCard,
    BaseHeader,
    BaseNav,
    BaseSidebar,
    BaseSidebarItem,
    HeaterControlPanel,
    LightControlPanel,
    PumpControlPanel,
    SensorControlPanel,
    SidebarReactorItem,
    SidePumpControl,
  },
  data() {
    return {
      showPumpControls: false,
    };
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
    setPrime1Active() {
      this.updateSelectedModule('Prime1');
    },
    setPrime2Active() {
      this.updateSelectedModule('Prime2');
    },
    togglePumpControls() {
      this.showPumpControls = !this.showPumpControls;
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
.line {
  margin-bottom: 1em;
  border-top: 1px solid white;
  opacity: 0.5;
  width: 88%;
}

.sb-divider {
  font-size: 1em;
  padding: .5em 1em;
  font-weight: 600;
  letter-spacing: 0.3px;
  opacity: 0.8;
}

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
