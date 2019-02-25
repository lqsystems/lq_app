/* eslint "no-shadow": "off" */
import { normalize } from 'normalizr';
import router from '@/router';
import callApi from '@/utils/ApiUtils.js';
import { moduleSchema } from '@/constants/Schemas';
import { MODULES_URL } from '@/constants/ApiConstants';
import {
  LOAD_REACTIONS,
  LOAD_MODULES,
  FETCH_MODULES,
} from './mutations.types';

const state = {
  modules: {},
  reactions: {},
};

const mutations = {
  [LOAD_MODULES](state, modules) {
    state.modules = modules;
  },
  [LOAD_REACTIONS](state, reactions) {
    state.reactions = reactions;
  },
};

const actions = {
  async [FETCH_MODULES]({ commit }, successRoute) {
    // if user is logged in 'data' will contain module data
    // otherwise 'data' will contain an error message
    try {
      const { data } = await callApi(MODULES_URL);
      const { message } = data;

      if (message && (message[0] === 'Not logged in')) {
        return router.push('/login');
      }

      const { entities } = normalize(data, moduleSchema);
      const { modules, reactions } = entities;
      commit(LOAD_MODULES, modules);
      commit(LOAD_REACTIONS, reactions);

      if (successRoute) {
        router.push(successRoute);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const getHeater = (state, { activeModuleState, activeModuleParams, activeModuleLimits }) => ({
  powerOn: activeModuleState.Heater,
  level: activeModuleParams.Heater.level,
  minTemp: activeModuleLimits.Heater['LOW-value'],
  maxTemp: activeModuleLimits.Heater['HIGH-value'],
});

export const getters = {
  activeModule: state => state.modules.ZeePrime,
  activeModuleParams: (state, { activeModule }) => activeModule.parameters,
  activeModuleState: (state, { activeModule }) => activeModule.moduleState,
  activeModuleLimits: (state, { activeModule }) => activeModule.limits,
  activeModuleHeater: getHeater,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
