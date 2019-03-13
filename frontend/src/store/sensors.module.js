import {
} from './mutations.types';

const state = {
  OD: '_',
  temperature: '_',
};

const mutations = {
  SOCKET_DATUM(state, message) {
    console.log('** from mutation **');
    console.log(message);
    state.OD = message.message.OD;
    state.temperature = message.message.Temperature;
  },
};

const actions = {
};

const getters = {
};

export default {
  state,
  mutations,
  actions,
  getters,
};
