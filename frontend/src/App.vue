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

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  padding-bottom: 85px;
}
</style>
