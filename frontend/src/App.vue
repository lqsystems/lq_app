<template>
  <v-app>
    <router-view />
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
