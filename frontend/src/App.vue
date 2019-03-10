<template>
  <v-app>
    <transition
      name="router-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view v-if="true" />
    </transition>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import { FETCH_MODULES } from '@/store/actions.types.js';

export default {
  name: 'App',
  created() {
    this.FETCH_MODULES();
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log('connected');
    },

    disconnect() {
    },

    // Fired when the server sends something on the "messageChannel" channel.
    module(data) {
      console.log(data);
    },
  },
  methods: {
    ...mapActions([FETCH_MODULES]),
  },
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

* {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  padding-bottom: 65px;
}

.view {
  position: fixed;
  width: 100%;
}
</style>
