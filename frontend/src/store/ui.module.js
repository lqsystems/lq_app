/* eslint "no-shadow": "off" */
import {
  SET_AIR_ACTIVE,
  SET_LIGHT_ACTIVE,
  SET_HEATER_ACTIVE,
} from './mutations.types';

const state = {
  environmentControls: {
    selectedControl: 'Heater',
  },
};

const mutations = {
  [SET_AIR_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Air';
  },
  [SET_LIGHT_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Light';
  },
  [SET_HEATER_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Heater';
  },
};

const getters = {
  selectedControlPanel: state => state.environmentControls.selectedControl,
};

export default {
  state,
  mutations,
  getters,
};
