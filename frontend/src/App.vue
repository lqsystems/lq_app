<template>
  <v-app>
    <div class="app-container">
      <div class="app-main">
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped lang="scss">
// overrides vuetify's default background
.theme--light.application {
  background: white;
}
</style>
