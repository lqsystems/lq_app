<template>
  <div class="reactor">
    <div class="reactor-col reactor-col-left">
      <div class="reactor-status-panel">
        <PresentValuesStatusPanel />
      </div>
      <div class="reactor-status-panel">
        <EnvironmentControlsStatusPanel />
      </div>
    </div>
    <div class="reactor-col reactor-col-right">
      right
    </div>
    <div class="nav">
      <BaseNav />
    </div>
  </div>
</template>


<script>
import BaseNav from '@/components/BaseNav';
import PresentValuesStatusPanel from '@/components/PresentValuesStatusPanel';
import EnvironmentControlsStatusPanel from '@/components/EnvironmentControlsStatusPanel';


export default {
  components: {
    PresentValuesStatusPanel,
    EnvironmentControlsStatusPanel,
    BaseNav,
  },
};
</script>

<style lang="scss">
.r-test {
  width: 100%;
  height: 300px;
  background-color: lightgrey;
}

.reactor {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "left right";

  .control-panel-main {
    padding: .5em 0;
  }

  .cp-item {
    padding-left: 2.3em;
    padding-right: 3.8em;
  }

  .status-panel-icon {
    font-size: 1.4em;
    position: absolute;
    right: 0.6em;
    top: 0.3em;
    color: silver;
  }
}

.reactor-col {
  padding: 4em;
}

.reactor-col-left {
  grid-area: left;
}

.reactor-status-panel {
  margin-bottom: 3em;
}

.reactor-col-right {
  grid-area: right;
  background-color: skyblue;
}

.nav {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
}
</style>
