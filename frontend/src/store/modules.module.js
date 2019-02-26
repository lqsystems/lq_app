/* eslint "no-shadow": "off" */
import {
  FETCH_MODULES_REQUEST,
  FETCH_MODULES_FAILURE,
  FETCH_MODULES_SUCCESS,
  UPDATE_SELECTED_MODULE,
} from './mutations.types';

const state = {
  // TODO: import module name as a constant
  selectedModuleName: 'ZeePrime',
  isFetching: true,
};

const mutations = {
  [UPDATE_SELECTED_MODULE](state, name) {
    state.selectedModuleName = name;
  },
  [FETCH_MODULES_REQUEST](state) {
    state.isFetching = true;
  },
  [FETCH_MODULES_SUCCESS](state) {
    state.isFetching = false;
  },
  [FETCH_MODULES_FAILURE](state) {
    state.isFetching = false;
  },
};


const getters = {
  selectedModuleName: state => (state.selectedModuleName === 'Dosis1' ? 'LQR' : state.selectedModuleName),
};

export default {
  state,
  mutations,
  getters,
};
