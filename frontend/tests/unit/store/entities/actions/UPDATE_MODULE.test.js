/* eslint "no-shadow": "off" */
import { getModuleUpdateAction } from '@/store/entities.module';
import { validatePayload } from '@/utils/entities.utils';

// const { UPDATE_MODULE_STATE } = actions;

const MUTATE_MODULE_STATE = 'MUTATE_MODULE_STATE';
const UPDATE_STATE_URL = 'UPDATE_STATE_URL';

const commit = jest.fn();
const callApi = jest.fn();

const mockMuationPayload = {
  actuatorType: 'lamp',
  newstate: true,
};

const getters = {
  selectedModuledName: 'ZeePrime',
  getApiUpdatePayload: () => ({ foo: 'bar' }),
};


describe('UPDATE_MOUDLE actions', () => {
  test('commit and callApi are called with correct values', () => {
    const UPDATE_MODULE_STATE = (
      getModuleUpdateAction(MUTATE_MODULE_STATE, validatePayload, callApi, UPDATE_STATE_URL)
    );

    UPDATE_MODULE_STATE({ commit, getters }, mockMuationPayload);

    expect(commit).toHaveBeenCalledWith(MUTATE_MODULE_STATE, {
      moduleName: 'ZeePrime',
      actuatorType: 'lamp',
      newstate: true,
    });

    expect(callApi).toHaveBeenCalledWith(UPDATE_STATE_URL, {
      method: 'POST',
      data: { foo: 'bar' },
    });
  });

  test('throws error if undefined values are supplied in payload', () => {
    const UPDATE_MODULE_STATE = (
      getModuleUpdateAction(MUTATE_MODULE_STATE, validatePayload, callApi, UPDATE_STATE_URL)
    );

    const testPayload = { moduleName: 'foo', actuatorType: undefined, newState: { biz: 'bang' } };
    const testFunc = () => UPDATE_MODULE_STATE({ commit, getters }, testPayload);
    expect(testFunc).toThrow();
  });
});
