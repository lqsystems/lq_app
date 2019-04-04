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
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

* {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  padding-bottom: 65px;
}

.application {
  // background-image: url('assets/bluespace.png') !important;
  // background-size: cover !important;
}

.theme--light {
  opactiy: 0 !important;
}

.view {
  position: fixed;
  width: 100%;
}

</style>
