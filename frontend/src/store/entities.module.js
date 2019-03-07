/* eslint "no-shadow": "off" */
import { normalize } from 'normalizr';
import router from '@/router';
import callApi from '@/utils/api.utils.js';

import { moduleSchema } from '@/constants/schemas';
import { MODULES_URL, UPDATE_STATE_URL } from '@/constants/api.constants';
import { modulesInitial } from './entities.initialState.js';
import { UPDATE_MODULE_STATE } from './actions.types';
import {
  FETCH_MODULES,
  LOAD_REACTIONS,
  LOAD_MODULES,
  MUTATE_MODULE_STATE,
  MUTATE_MODULE_PARAMS,
  MUTATE_MODULE_LIMITS,
} from './mutations.types';

const state = {
  modules: modulesInitial,
  reactions: {},
};

export const mutations = {
  // TODO: refactor to generic LOAD_ENTITY
  [LOAD_MODULES](state, modules) {
    state.modules = modules;
  },

  // TODO: refactor to generic LOAD_ENTITY
  [LOAD_REACTIONS](state, reactions) {
    state.reactions = reactions;
  },
  [MUTATE_MODULE_STATE](state, { moduleName, actuatorType, newState }) {
    state.modules[moduleName].moduleState[actuatorType] = newState;
  },
  [MUTATE_MODULE_PARAMS](state, { moduleName, actuatorType, newParams }) {
    const { level } = newParams;
    // the api requires that level is a string. Ensure that that is the case
    newParams = level && (typeof level === 'number')
      ? Object.assign({}, newParams, { level: String(level) })
      : newParams;

    const currentParams = state.modules[moduleName].parameters;
    const currentParamsValues = currentParams[actuatorType];
    currentParams[actuatorType] = Object.assign({}, currentParamsValues, newParams);
  },
  [MUTATE_MODULE_LIMITS](state, moduleName, actuatorType, newLimits) {
    const currentLimits = state.modules[moduleName].limits;
    const currentLimitsValues = currentLimits[actuatorType];
    currentLimits[actuatorType] = Object.assign({}, currentLimitsValues, newLimits);
  },
};


// TODO: refactor to handle errors
export const getModuleUpdateAction = (mutationType, callApi, requestUrl) => (
  { commit, state, getters },
  mutationPayload,
) => {
  const { getApiUpdatePayload, selectedModuledName } = getters;
  mutationPayload = Object.assign({}, mutationPayload, { moduleName: selectedModuledName });

  commit(mutationType, mutationPayload);

  const { actuatorKey } = mutationPayload;
  const requestPayload = getApiUpdatePayload(actuatorKey);

  callApi(requestUrl, {
    method: 'POST',
    data: requestPayload,
  });
};


export const actions = {
  async [FETCH_MODULES]({ commit }, successRoute) {
    // If user is logged in 'data' will contain an array of module data.
    // Otherwise 'data' will contain an error message.
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
  [UPDATE_MODULE_STATE]: getModuleUpdateAction(MUTATE_MODULE_STATE, callApi, UPDATE_STATE_URL),
};

const getHeater = (state, { activeModuleState, activeModuleParams, activeModuleLimits }) => ({
  powerOn: activeModuleState.Heater,
  level: activeModuleParams.Heater.level,
  minTemp: activeModuleLimits.Heater['LOW-value'],
  maxTemp: activeModuleLimits.Heater['HIGH-value'],
});

const getApiUpdatePayload = actuatorName => (
  state,
  {
    activeModuleState, activeReactionId, selectedModuleName, activeModuleParams, activeModuleLimits,
  },
) => {
  const { level } = activeModuleParams;

  const paramsKey = `${selectedModuleName}-${actuatorName}-parameters`;
  const limitsKey = `${selectedModuleName}-${actuatorName}-limits`;
  return {
    mid: selectedModuleName,
    allStates: activeModuleState,
    activeId: activeReactionId,
    activeSwitch: `ReactionActive-${activeReactionId}`,
    changes: [actuatorName],
    [paramsKey]: activeModuleParams[actuatorName],
    [limitsKey]: activeModuleLimits[actuatorName] || {},
  };
};

export const getActiveReactionId = state => (
  Object.keys(state.reactions).filter(reactionId => state.reactions[reactionId].active)[0]
);

export const getters = {
  activeReactionId: getActiveReactionId,
  activeModule: (state, { selectedModuleName }) => state.modules[selectedModuleName],
  activeModuleParams: (state, { activeModule }) => activeModule.parameters,
  activeModuleState: (state, { activeModule }) => activeModule.moduleState,
  activeModuleLimits: (state, { activeModule }) => activeModule.limits,
  heater: getHeater,
  getApiUpdatePayload, // TODO: move this out of getters object and export
  lampUpdatePayload: getApiUpdatePayload('Lamp'),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
