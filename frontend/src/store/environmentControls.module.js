/* eslint "no-shadow": "off" */
import Vue from 'vue';
import {
  SET_ACTIVE_CONTROL_PANEL,
  SET_AIR_ACTIVE,
  SET_HEATER_ACTIVE,
  SET_HEATER_LEVEL,
  SET_LIGHT_ACTIVE,
  TOGGLE_HEATER_POWER,
} from './mutations.types';

const reformatByActuator = ({ state, levels, limits }) => ({
  air: {
    powerOn: state.Air,
  },
  heater: {
    powerOn: state.Heater,
    level: Number(levels.Heater.level),
    minTemp: limits.Heater['LOW-value'],
    maxTemp: limits.Heater['HIGH-value'],
  },
  lamp: {
    powerOn: state.Lamp,
    level: Number(levels.Lamp.level),
  },
});

// TODO: make constants for each panel type
const state = {
  activeControlPanel: 'Heater',
  air: {
    powerOn: false,
  },
  heater: {
    powerOn: false,
    level: '66',
    minTemp: '25',
    maxTemp: '80',
  },
  lamp: {
    powerOn: false,
    level: '54',
  },
};


// TODO: make constants for each control type
const mutations = {
  [SET_AIR_ACTIVE](state) {
    state.activeControlPanel = 'Air';
  },
  [SET_LIGHT_ACTIVE](state) {
    state.activeControlPanel = 'Heater';
  },
  [SET_HEATER_ACTIVE](state) {
    state.activeControlPanel = 'Light';
  },
  [SET_HEATER_LEVEL](state, level) {
    [state.heater.level] = level;
  },
  [TOGGLE_HEATER_POWER](state) {
    const { powerOn } = state.heater;
    state.heater.powerOn = !powerOn;
  },
};

const getters = {
  air: state => state.air,
  heater: state => state.heater,
  lamp: state => state.lamp,
  activeControlPanel: state => state.activeControlPanel,
};

export default {
  state,
  mutations,
  getters,
};
