<template>
  <div class="reactor view">
    <BaseHeader :title="selectedModuleName" />
    <div class="reactor-main">
      <div class="reactor-col reactor-col-left">
        <div class="reactor-status-panel">
          <PresentValuesStatusPanel />
        </div>
        <div class="reactor-status-panel">
          <EnvironmentControlsStatusPanel />
        </div>
      </div>
      <div class="reactor-col reactor-col-right">
        <div class="reaction-select-wrapper">
          <BaseSelect label="Reaction" />
        </div>
        <img
          class="reactor-graphic"
          src="@/assets/bioreactor-graphic.png"
          alt="bioreactor graphic"
        >
      </div>
    </div>
    <div class="nav">
      <BaseNav />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseNav from '@/components/BaseNav';
import BaseHeader from '@/components/BaseHeader';
import BaseSelect from '@/components/BaseSelect';
import PresentValuesStatusPanel from '@/components/PresentValuesStatusPanel';
import EnvironmentControlsStatusPanel from '@/components/EnvironmentControlsStatusPanel';

export default {
  name: 'Reactor',
  components: {
    PresentValuesStatusPanel,
    EnvironmentControlsStatusPanel,
    BaseHeader,
    BaseNav,
    BaseSelect,
  },

  computed: {
    ...mapGetters(['selectedModuleName']),
  },
};
</script>

<style lang="scss">
@import "../styles/variables";

.reactor {
  height: 100%;
}

.status-panel-icon {
  font-size: 1.4em;
  position: absolute;
  right: 0.6em;
  top: 0.3em;
  color: silver;
}

.reactor-header {
  background-color: $grey-300;
  padding: 20px 30px;
  font-size: 1.5em;
}

.reactor-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "left right";
  overflow: hidden;
  height: calc(100% - 130px);
}


.reactor-col {
  padding: 2.8em 5.7em;
}

.reactor-col-left {
  grid-area: left;
}

.reactor-col-right {
  grid-area: right;
  padding-top: 1.5em;
}

.reactor-status-panel {
  margin-bottom: 3.5em;
}

.reaction-select-wrapper {
  width: 50%;
  margin: 0 auto;
  margin-bottom: .7em;
}

.reactor-graphic {
  display: block;
  margin: 0 auto;
  width: 45%;
  height: 52.5vh;
}

.nav {
  border: 1px solid $grey-200;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
}
</style>
