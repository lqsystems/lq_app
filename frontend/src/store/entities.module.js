/* eslint "no-shadow": "off" */

import { normalize } from 'normalizr';
import { moduleSchema } from '@/constants/Schemas';
import callApi from '@/utils/ApiUtils.js';
import router from '@/router';

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

const urlFetch = 'http://localhost:8888/';

const actions = {
  async [FETCH_MODULES]({ commit }, successRoute) {
    // if user is logged in 'data' will contain module data
    // otherwise 'data' will contain an error message
    try {
      const { data } = await callApi(urlFetch);
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

const getters = {
};

export default {
  state,
  mutations,
  actions,
  getters,
};
