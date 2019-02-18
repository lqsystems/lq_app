<template>
  <div class="reactor">
    <div class="reactor-header">
      Zee Prime
    </div>
    <div class="reactor-main">
      <div class="reactor-col reactor-col-left">
        <div class="reactor-status-panel">
          <PresentValuesStatusPanel />
        </div>
        <div
          class="reactor-status-panel"
        >
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
import BaseNav from '@/components/BaseNav';
import BaseSelect from '@/components/BaseSelect';
import PresentValuesStatusPanel from '@/components/PresentValuesStatusPanel';
import EnvironmentControlsStatusPanel from '@/components/EnvironmentControlsStatusPanel';


export default {
  components: {
    PresentValuesStatusPanel,
    EnvironmentControlsStatusPanel,
    BaseNav,
    BaseSelect,
  },
  methods: {
    routeToControls() {
      this.$router.push('rc');
    },
  },
};
</script>

<style lang="scss">
@import "../styles/variables";

.reactor {
  height: 100%;

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
  height: calc(100% - 156px);
}

.reactor-col-left {
  grid-area: left;
}

.reactor-col-right {
  grid-area: right;
}

.reactor-col {
  padding: 2.8em 4em;
}

.reactor-status-panel {
  margin-bottom: 5em;
}

.reaction-select-wrapper {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 2em;
}

.reactor-graphic {
  display: block;
  margin: 0 auto;
  width: 45%;
  height: 65vh;
};

.nav {
  border: 1px solid $grey-200;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
}
</style>
