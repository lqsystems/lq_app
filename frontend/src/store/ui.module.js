/* eslint "no-shadow": "off" */
import {
  SET_AIR_ACTIVE,
  SET_LIGHT_ACTIVE,
  SET_HEATER_ACTIVE,
  SET_SENSORS_ACTIVE,
} from './mutations.types';

const state = {
  environmentControls: {
    selectedControl: localStorage.selectedEnvironmentControl || 'Sensor',
  },
};

// TODO: use function composition to make these mutations DRY
const mutations = {
  [SET_SENSORS_ACTIVE](state) {
    state.environmentControls.selectedControl = 'Sensor';
    localStorage.selectedEnvironmentControl = 'Sensor';
  },
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
