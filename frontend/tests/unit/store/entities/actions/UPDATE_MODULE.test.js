/* eslint "no-shadow": "off" */

import { getModuleUpdateAction } from '@/store/entities.module';

// const { UPDATE_MODULE_STATE } = actions;

const MUTATE_MODULE_STATE = 'MUTATE_MODULE_STATE';
const UPDATE_STATE_URL = 'UPDATE_STATE_URL';

const commit = jest.fn();
const callApi = jest.fn();

const mockMuationPayload = {
  actuatorkey: 'lamp',
  newstate: true,
};

const getters = {
  selectedModuledName: 'ZeePrime',
  getApiUpdatePayload: () => ({ foo: 'bar' }),
};


describe('UPDATE_MOUDLE actions', () => {
  test('commit and callApi are called with correct values', () => {
    const UPDATE_MODULE_STATE = (
      getModuleUpdateAction(MUTATE_MODULE_STATE, callApi, UPDATE_STATE_URL)
    );

    UPDATE_MODULE_STATE({ commit, getters }, mockMuationPayload);

    expect(commit).toHaveBeenCalledWith(MUTATE_MODULE_STATE, {
      moduleName: 'ZeePrime',
      actuatorkey: 'lamp',
      newstate: true,
    });

    expect(callApi).toHaveBeenCalledWith(UPDATE_STATE_URL, {
      method: 'POST',
      data: { foo: 'bar' },
    });
  });
});
