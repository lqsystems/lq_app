import { diff } from 'deep-object-diff';
import { actions } from '@/store/entities.module';
import { diffStatesOnUpdateMessage, getModuleByReactionId } from '@/utils/entities.utils';
import mockState from '../../mockState';

const { HANDLE_UPDATE_STATE_MESSAGE } = actions;

describe('HANDLE_UPDATE_STATE_MESSAGE', () => {
  const testMessage = {
    '5c6b66b88fd25d3cd9603399': {
      state: {
        SensorOnOff: false,
        Air: false,
        Lamp: false,
        Heater: true,
        water: false,
        inoculum: false,
        extraction: false,
        mixer: false,
        forward: false,
        backwards: false,
      },
    },
  };
  const MUTATE_MODULE_STATE = 'MUTATE_MODULE_STATE';

  test('commits a mutation if current state is different that incoming state', () => {
    const commit = jest.fn();

    HANDLE_UPDATE_STATE_MESSAGE(
      { commit, state: mockState.entities },
      {
        message: testMessage,
        moduleGetter: getModuleByReactionId,
        stateDiffGetter: diffStatesOnUpdateMessage,
        objectDiffGetter: diff,
        mutationType: MUTATE_MODULE_STATE,
      },
    );

    expect(commit).toHaveBeenCalledWith(MUTATE_MODULE_STATE, {
      moduleName: 'ZeePrime',
      actuatorType: 'Heater',
      newState: true,
    });
  });

  test('does not commit a mutation if current state is the same as incoming state', () => {
    const commit = jest.fn();
    testMessage['5c6b66b88fd25d3cd9603399'].state.Heater = false;

    HANDLE_UPDATE_STATE_MESSAGE(
      { commit, state: mockState.entities },
      {
        message: testMessage,
        moduleGetter: getModuleByReactionId,
        stateDiffGetter: diffStatesOnUpdateMessage,
        objectDiffGetter: diff,
        mutationType: MUTATE_MODULE_STATE,
      },
    );

    expect(commit).not.toBeCalled();
  });
});
