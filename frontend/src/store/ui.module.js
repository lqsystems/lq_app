/* eslint "no-shadow": "off" */
import {
  SET_AIR_ACTIVE,
  SET_LIGHT_ACTIVE,
  SET_HEATER_ACTIVE,
  SET_PUMP_ACTIVE,
} from './mutations.types';

const state = {
  environmentControls: {
    selectedControl: localStorage.selectedEnvironmentControl || 'Pump',
  },
};

// TODO: use function composition to make these mutations DRY
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
  [SET_PUMP_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Pump';
    localStorage.selectedEnvironmentControl = 'Pump';
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
