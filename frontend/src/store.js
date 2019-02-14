import Vue from 'vue';
import Vuex from 'vuex';

import callApi from './utils/ApiUtils';
import { ENVIRONMENT_URL } from './constants/ApiConstants';
import environmentDefaultState from './data/mockDataEnvironment';

Vue.use(Vuex);

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

// TODO: move to getters file
const getHeater = state => state.environment.heater;

export default new Vuex.Store({
  state: {
    count: 0,
    environment: environmentDefaultState,
  },
  mutations: {
    loadEnvironment(state, environment) {
      state.environment = environment;
    },
    toggleHeaterPower(state) {
      const { powerOn } = getHeater(state);
      state.environment.heater.powerOn = !powerOn;
    },
    updateHeaterLevel(state, level) {
      state.environment.heater.level = level;
    },
    // ...more mutations for updating air and light state
  },
  actions: {
    // TODO: add a handler for errors
    fetchEnvironmentState({ commit }) {
      callApi(ENVIRONMENT_URL)
        .then((data) => {
          const reformattedState = reformatByActuator(data);
          commit('loadEnvironment', reformattedState);
        });
    },
  },
  getters: {
    heater: getHeater,
  },
});
