/* eslint "no-shadow": "off" */
import {
  SET_AIR_ACTIVE,
  SET_LIGHT_ACTIVE,
  SET_HEATER_ACTIVE,
} from './mutations.types';

const state = {
  environmentControls: {
    selectedControl: localStorage.selectedEnvironmentControl || 'Air',
  },
};

// TODO: refactor to compose these mutations with a HOF

const mutations = {
  [SET_AIR_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Air';
    localStorage.selectedEnvironmentControl = 'Air';
  },
  [SET_LIGHT_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Light';
    localStorage.selectedEnvironmentControl = 'Light';
  },
  [SET_HEATER_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Heater';
    localStorage.selectedEnvironmentControl = 'Heater';
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
