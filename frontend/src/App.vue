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

import { mapActions, mapMutations } from 'vuex';
import { diff } from 'deep-object-diff';
import { diffStatesOnUpdateMessage, getModuleByReactionId } from '@/utils/entities.utils';
import { FETCH_MODULES, HANDLE_UPDATE_STATE_MESSAGE } from '@/store/actions.types';
import { MUTATE_MODULE_STATE, SOCKET_DATUM } from '@/store/mutations.types';

export default {
  name: 'App',
  created() {
    this.FETCH_MODULES();
  },
  sockets: {
    module(message) {
      console.log('Limit Crossover Detected');
      console.log('incoming message', message);

      this.HANDLE_UPDATE_STATE_MESSAGE({
        message,
        moduleGetter: getModuleByReactionId,
        stateDiffGetter: diffStatesOnUpdateMessage,
        objectDiffGetter: diff,
        mutationType: MUTATE_MODULE_STATE,
      });
    },

    // receives sensor data for OD and Temp
    datum(message) {
      this.SOCKET_DATUM(message);
    },
  },
  methods: {
    ...mapMutations([SOCKET_DATUM]),
    ...mapActions([FETCH_MODULES, HANDLE_UPDATE_STATE_MESSAGE]),
  },
};
</script>

<style lang="scss">
$font-color: white;

* {
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  padding-bottom: 65px;
}

.application {
  background-image: url("assets/space-blue.jpg") !important;
  background-size: cover !important;
  font-family: "Roboto Condensed" !important;
}

.theme--light {
  opactiy: 0 !important;

  &.application {
    color: $font-color !important;
  }
}

// TODO learn why this is needed
.view {
  position: fixed;
  width: 100%;
}
</style>
