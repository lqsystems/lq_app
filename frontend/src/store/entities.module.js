/* eslint "no-shadow": "off" */
import Vue from 'vue';
import callApi from '@/utils/ApiUtils.js';
import router from '@/router';


import {
} from './mutations.types';


const state = {
  modules: [],
};

// TODO: make loadModules constant
const mutations = {
  loadModules(state, modules) {
    state.modules = modules;
  },
};

// TODO: make fetchModules constant
const urlFetch = 'http://localhost:8888/';

const actions = {
  async fetchModules({ commit }, successRoute) {
    const { data } = await callApi(urlFetch);
    const { message } = data;

    if (message && (message[0] === 'Not logged in')) {
      return router.push('/login');
    }

    commit('loadModules', data);

    if (successRoute) {
      router.push(successRoute);
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
