import Vue from 'vue';
import Vuex from 'vuex';

import entities from './entities.module';
import modules from './modules.module';
import sensors from './sensors.module';
import ui from './ui.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entities,
    modules,
    sensors,
    ui,
  },
});
