<template>
  <v-app>
    <transition
      name="router-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

* {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  padding-bottom: 85px;
}

.view {
  position: fixed;
  width: 100%;
}
</style>
