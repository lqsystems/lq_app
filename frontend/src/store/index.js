import Vue from 'vue';
import Vuex from 'vuex';

import entities from './entities.module';
import modules from './modules.module';
import sensors from './sensors.module';
import ui from './ui.module';

Vue.use(Vuex);

const uiSounds = (store) => {
  store.subscribe((mutation) => {
    const { type } = mutation;

    if (type.includes('ACTIVE')
    || type.includes('MUTATE_MODULE_STATE')
    || type.includes('UPDATE_SELECTED_MODULE')
    ) {
      const audio = new Audio(require('@/assets/click.mp3'));
      // audio.play();
    }
  });
};

export default new Vuex.Store({
  modules: {
    entities,
    modules,
    sensors,
    ui,
  },
  plugins: [uiSounds],
});
