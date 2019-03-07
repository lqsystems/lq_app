/* eslint "no-shadow": "off" */

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

function UPDATE_MOUDLE({ commit, state, getters }, mutationPayload) {
  const { getApiUpdatePayload, selectedModuledName } = getters;
  mutationPayload = Object.assign({}, mutationPayload, { moduleName: selectedModuledName });
  commit(MUTATE_MODULE_STATE, mutationPayload);

  const { actuatorKey } = mutationPayload;
  const requestPayload = getApiUpdatePayload(actuatorKey);

  callApi(UPDATE_STATE_URL, {
    method: 'POST',
    data: requestPayload,
  });
}

describe('UPDATE_MOUDLE actions', () => {
  test('commit and callApi are called with correct values', () => {
    UPDATE_MOUDLE({ commit, getters }, mockMuationPayload);
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
