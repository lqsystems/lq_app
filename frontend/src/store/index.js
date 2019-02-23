import Vue from 'vue';
import Vuex from 'vuex';

// import environmentControls from './environmentControls.module';
import entities from './entities.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entities,
  },
});
