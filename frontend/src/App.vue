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
import { mapActions, mapMutations } from 'vuex';
import { FETCH_MODULES } from '@/store/actions.types.js';
import { SOCKET_DATUM } from '@/store/mutations.types';

export default {
  name: 'App',
  created() {
    this.FETCH_MODULES();
  },

  sockets: {
    module(data) {
      console.log(data);
    },

    // receives sensor data for OD and Temp
    datum(data) {
      console.log(data);
      this.SOCKET_DATUM(data);
    },
  },
  methods: {
    ...mapMutations([SOCKET_DATUM]),
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
