import { SOCKET_DATUM, SET_POWER } from './mutations.types';
import { dosisMods } from '@/shared_config/dosisMods';

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

const initializeModules = (modules) => {
  const initialState = {
    Power: { power: '' },
  };
  Object.keys(modules).forEach((key) => {
    initialState[key] = {
      OD: '',
      temperature: '',
    };
  });
  return initialState;
};

const initialState = initializeModules(dosisMods);

export const mutations = {
  [SET_POWER](state, { message }) {
    const { Power } = message;

    if (isNumber(Power)) {
      state.Power = { power: Power };
    }
  },
  [SOCKET_DATUM](state, { message }) {
    let { module, OD, Temperature } = message;

    if (Number(Temperature) < 0) {
      console.log(`Negative temperature reading detected for module ${module}. Rejecting sensor update with temp reading ${Temperature}`);
      return;
    }

    module = module === 'ZeePrime' ? 'Prime1' : module;

    state[module].OD = OD;
    state[module].temperature = Temperature;
  },
};

export default {
  state: initialState,
  mutations,
};
