import Vue from 'vue';
import Vuex from 'vuex';

import environmentControls from './environmentControls.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    environmentControls,
  },
});
