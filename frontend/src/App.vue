<template>
  <v-app>
    <div class="app-container">
      <div class="app-main">
        <router-view />
      </div>
      <div class="app-nav">
        <BaseNav />
      </div>
    </div>
  </v-app>
</template>

<script>
import BaseNav from '@/components/BaseNav';

export default {
  name: 'App',
  components: {
    BaseNav,
  },
};
</script>

<style scoped lang="scss">
// overrides vuetify's default background
.theme--light.application {
  background: white;
}

.app-container {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-areas:
    "main"
    "nav";
  grid-template-rows: 5fr 1fr;

  .app-main {
    grid-area: main;
    border: 1px solid tomato;
  }

  .app-nav {
    grid-area: nav;
  }
}
</style>
