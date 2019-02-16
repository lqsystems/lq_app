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
* {
  box-sizing: border-box;
}

.theme--light.application {
  background: white;
}

.test {
  border: 1px solid #000;
  background-color: skyblue;
  width: 100%;
  height: 100%;
}
</style>
