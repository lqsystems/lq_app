import { SOCKET_DATUM } from './mutations.types';
import { dosisMods } from '@/shared_config/dosisMods';

const initializeModules = (modules) => {
  const initialState = {};
  Object.keys(modules).forEach((key) => {
    initialState[key] = {
      OD: '-',
      temperature: '-',
    };
  });
  return initialState;
};

const initialState = initializeModules(dosisMods);

export const mutations = {
  [SOCKET_DATUM](state, { message }) {
    const { module, OD, Temperature } = message;

    if (Number(Temperature) < 0) {
      console.log(`Negative temperature reading detected for module ${module}. Rejecting sensor update with temp reading ${Temperature}`);
      return;
    }

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
