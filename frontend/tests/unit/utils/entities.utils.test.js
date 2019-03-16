import { diff } from 'deep-object-diff';
import { diffStatesOnUpdateMessage, getModuleByReactionId, validatePayload } from '@/utils/entities.utils';

import mockState from '../store/mockState';

describe('diffStatesOnUpdateMessage', () => {
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
  test(
    `returns an array of objects. Each object corresponds to a different state type where 
     a change is found. Each object will include the moduleName, actuatorType, and state change.
    `,
    () => {
      const actual = diffStatesOnUpdateMessage(
        testMessage,
        mockState.entities,
        getModuleByReactionId,
        diff,
      );

      const expected = [{
        moduleName: 'ZeePrime',
        actuatorType: 'Heater',
        newState: true,
      }];
      expect(actual).toEqual(expected);
    },
  );

  test(
    'returns newState: false if stateUpdateMessage heater state is false  ',
    () => {
      testMessage['5c6b66b88fd25d3cd9603399'].state.Heater = false;
      mockState.entities.modules.ZeePrime.moduleState.Heater = true;

      const actual = diffStatesOnUpdateMessage(
        testMessage,
        mockState.entities,
        getModuleByReactionId,
        diff,
      );

      const expected = [{
        moduleName: 'ZeePrime',
        actuatorType: 'Heater',
        newState: false,
      }];
      expect(actual).toEqual(expected);
    },
  );

  test(
    'returns an empty array if reaction id is not found in state',
    () => {
      const unknownIdMessage = {
        '123abc': {
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

      const actual = diffStatesOnUpdateMessage(
        unknownIdMessage,
        mockState.entities,
        getModuleByReactionId,
        diff,
      );
      const expected = [];
      expect(actual).toEqual(expected);
    },
  );
});


describe('deep diff', () => {
  test('true to be true', () => {
    const currentState = {
      SensorOnOff: false,
      Air: false,
      Lamp: false,
      Heater: false,
      water: false,
      inoculum: false,
      mixer: false,
      extraction: false,
      forward: false,
      backwards: false,
    };

    const newState = {
      SensorOnOff: false,
      Air: false,
      Lamp: false,
      Heater: true,
      water: false,
      inoculum: false,
      mixer: false,
      extraction: false,
      forward: false,
      backwards: false,
    };
    const actual = diff(currentState, newState);
    expect(actual).toEqual({ Heater: true });
  });
});


describe('validatePayload', () => {
  test('throws an error if props have undefined values', () => {
    const testObj = { foo: null, bang: 'baz', biz: undefined };
    const testFunc = () => { validatePayload(testObj); };
    expect(testFunc).toThrow('The following keys had undefined values: foo, biz');
  });
  test('does not throw an error if all props are defined', () => {
    const testObj = { foo: 0, bang: '', biz: 'bang' };
    const testFunc = () => { validatePayload(testObj); };
    expect(testFunc).not.toThrow();
  });
});
