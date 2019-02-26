/* eslint "no-shadow": "off" */
import { normalize } from 'normalizr';
import router from '@/router';
import callApi from '@/utils/ApiUtils.js';

import { moduleSchema } from '@/constants/Schemas';
import { MODULES_URL } from '@/constants/ApiConstants';
import { modulesInitial } from './entities.initialState.js';

import {
  FETCH_MODULES,
  LOAD_REACTIONS,
  LOAD_MODULES,
  UPDATE_MODULE_STATE,
} from './mutations.types';

const state = {
  modules: modulesInitial,
  reactions: {},
};

const mutations = {
  [LOAD_MODULES](state, modules) {
    state.modules = modules;
  },
  [LOAD_REACTIONS](state, reactions) {
    state.reactions = reactions;
  },
  [UPDATE_MODULE_STATE](state, { moduleName, actuatorKey, newState }) {
    state.modules[moduleName].moduleState[actuatorKey] = newState;
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

// const getApiUpdatePayload = (state, { activeModuleState }) => console.log(state) || ({
const getApiUpdatePayload = actuatorName => (
  state,
  {
    activeModuleState, activeReactionId, selectedModuleName, activeModuleParams, activeModuleLimits,
  },
) => {
  const paramsKey = `${selectedModuleName}-${actuatorName}-parameters`;
  return {
    mid: selectedModuleName,
    allStates: activeModuleState,
    activeId: activeReactionId,
    activeSwitch: `ReactionActive-${activeReactionId}`,
    changes: [actuatorName],
    [paramsKey]: activeModuleParams[actuatorName],
    'ZeePrime-Lamp-limits': {},
  };
};

const getActiveReactionId = state => (
  Object.keys(state.reactions).filter(reactionId => state.reactions[reactionId].active)[0]
);

export const getters = {
  activeReactionId: getActiveReactionId,
  activeModule: (state, { selectedModuleName }) => state.modules[selectedModuleName],
  activeModuleParams: (state, { activeModule }) => activeModule.parameters,
  activeModuleState: (state, { activeModule }) => activeModule.moduleState,
  activeModuleLimits: (state, { activeModule }) => activeModule.limits,
  heater: getHeater,
  lampUpdatePayload: getApiUpdatePayload('Lamp'),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
