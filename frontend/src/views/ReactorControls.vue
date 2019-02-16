<template>
  <div class="reactor-controls">
    <div class="rc-header">
      <v-icon v-on:click="routeHome">
        {{ 'arrow_back' }}
      </v-icon>
      Zee Prime Controls
    </div>
    <div class="rc-main">
      <div class="rc-sidebar">
        <BaseSidebar />
      </div>
      <div class="rc-controls">
        <HeaterControlPanel />
      </div>
    </div>
  </div>
</template>

<script>
import BaseSidebar from '@/components/BaseSidebar';
import HeaterControlPanel from '@/components/HeaterControlPanel';

export default {
  components: {
    BaseSidebar,
    HeaterControlPanel,
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
  height: 100vh;
}

.rc-header {
  background-color: $light-grey;
  padding: 1.2em 1em;
  font-size: 1.6em;

  .theme--light {
    &.v-icon {
      font-size: 1.3em;
      margin-right: 1em;
    }
  }
}

.rc-main {
  display: grid;
  height: 100vh;
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
