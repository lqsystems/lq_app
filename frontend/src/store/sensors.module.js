import { SOCKET_DATUM } from './mutations.types';
import { dosisMods } from '@/shared_config/dosisMods';

const initialState = dosisMods;

export const mutations = {
  [SOCKET_DATUM](state, { message }) {
    const { module, OD, Temperature } = message;
    state[module].OD = OD;
    state[module].temperature = Temperature;
  },
};

const actions = {
};

const getters = {
};

export default {
  state: initialState,
  mutations,
  actions,
  getters,
};
