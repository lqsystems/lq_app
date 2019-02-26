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

// import * as stars from '@/utils/ApiTestUtils';
import { mapActions, mapState } from 'vuex';
import { mapGetters } from 'vuex';
import { FETCH_MODULES } from '@/store/actions.types.js';
import callApi from '@/utils/ApiUtils.js';
import { lampToggle } from '@/data/apiRequests.js';
import { UPDATE_STATE_URL } from '@/constants/ApiConstants.js';

const UPDATE_MODULE_DATA = (updatesObj) => {
  callApi(UPDATE_STATE_URL, {
    method: 'POST',
    data: updatesObj,
  });
};

export default {
  name: 'App',
  computed: {
    ...mapGetters(['apiUpdatePayload']),
    ...mapState({
      isFetching: state => state.modules.isFetching,
    }),
  },
  created() {
    this.FETCH_MODULES();
    UPDATE_MODULE_DATA(lampToggle);
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
  padding-bottom: 85px;
}

.view {
  position: fixed;
  width: 100%;
}
</style>
