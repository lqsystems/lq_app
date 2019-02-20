/* eslint "no-shadow": "off" */

import Vue from 'vue';

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
  activeControlPanel: 'AIR',
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

const mutations = {
  toggleHeaterPower(state) {
    const { powerOn } = state.heater;
    state.heater.powerOn = !powerOn;
  },
  updateHeaterLevel(state, level) {
    state.heater.level = level;
  },
};

export default {
  state,
  mutations,
};
