<template>
  <div class="reactor-controls">
    <div class="rc-header">
      <v-btn
        flat
        icon
        color=""
        v-on:click="routeHome"
      >
        <v-icon>
          arrow_back
        </v-icon>
      </v-btn>
      Zee Prime Controls
    </div>
    <div class="rc-main">
      <div class="rc-sidebar">
        <BaseSidebar />
      </div>
      <div class="rc-controls">
        <LightControlPanel />
      </div>
    </div>
  </div>
</template>

<script>
import BaseSidebar from '@/components/BaseSidebar';
import LightControlPanel from '@/components/LightControlPanel';
import HeaterControlPanel from '@/components/HeaterControlPanel';

export default {
  components: {
    BaseSidebar,
    HeaterControlPanel,
    LightControlPanel,
  },
  methods: {
    routeHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/variables";

.reactor-controls {
  height: 100%;
}

.rc-header {
  background-color: $light-grey;
  padding: 20px 20px;
  font-size: 1.5em;

  .theme--light {
    &.v-btn{
      font-size: 1.4em;
      margin-right: .5em;
    }
  }
}

.rc-main {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 3fr;
  grid-template-areas: "sidebar controls";
}

.rc-sidebar {
  grid-area: sidebar;
  padding-top: 1em;
}

.rc-controls {
  padding: 40px;
  grid-area: controls;
}
</style>
