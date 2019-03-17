import mockState from '../../mockState';
import { getters, getActiveReactionId } from '@/store/entities.module';
import { getModuleByReactionId } from '@/utils/entities.utils';

const state = mockState.entities;

const {
  activeModule,
  activeModuleState,
  activeModuleParams,
  activeModuleLimits,
  heater,
} = getters;

const activeModuleVal = activeModule(state, { selectedModuleName: 'ZeePrime' });
const activeModuleStateVal = activeModuleState(state, { activeModule: activeModuleVal });
const activeModuleParamsVal = activeModuleParams(state, { activeModule: activeModuleVal });
const activeModuleLimitsVal = activeModuleLimits(state, { activeModule: activeModuleVal });
const activeReactionIdVal = getActiveReactionId(() => {})(state);

export const mockGetters = {
  selectedModuleName: 'ZeePrime',
  activeModule: activeModuleVal,
  activeModuleState: activeModuleStateVal,
  activeModuleParams: activeModuleParamsVal,
  activeModuleLimits: activeModuleLimitsVal,
  activeReactionId: activeReactionIdVal,
};


describe('getModuleByReactionId', () => {
  test('returns an object representing ZeePrime module state given the corresponding reaction id', () => {
    const testReactionId = '5c536562d0e2ce03f1524c9c';
    const expected = state.modules.ZeePrime;
    const actual = getModuleByReactionId(state)(testReactionId);
    expect(expected).toEqual(actual);
  });

  test('returns an empty object if supplied reaction id is not found in state', () => {
    const testReactionId = '123';
    const expected = {};
    const actual = getModuleByReactionId(state)(testReactionId);
    expect(expected).toEqual(actual);
  });
});

// takes state and selectedModuleName
describe('activeModule getter', () => {
  test('returns a module when valid arguments are supplied', () => {
    const actual = activeModule(state, { selectedModuleName: 'ZeePrime' });
    expect(actual).toEqual(expect.objectContaining({
      moduleState: expect.any(Object),
    }));
  });
  test('throws an error if activeModule is undefined', () => {
    console.log = jest.fn();
    const callWithUndefinedState = () => { activeModule({ modules: {} }, 'MV1'); };
    expect(callWithUndefinedState).toThrowError('active module is undefined');
  });
  test('throws an error if selectedModuleName is undefined', () => {
    console.log = jest.fn();
    const callWithUndefinedState = () => {
      activeModule(state, { selectedModuleName: undefined });
    };
    expect(callWithUndefinedState).toThrowError('active module is undefined');
  });
  test('throws an error if selectedModuleName does not exist in state', () => {
    console.log = jest.fn();
    const callWithUndefinedState = () => {
      activeModule(state, { selectedModuleName: 'notAValidModuleName' });
    };
    expect(callWithUndefinedState).toThrowError('active module is undefined');
  });
});


describe('getActiveReactionId', () => {
  test('returns an id when valid arguments are supplied', () => {
    const alert = jest.fn();
    const actual = getActiveReactionId(alert)(state);
    const expected = '5c536562d0e2ce03f1524c9c';
    expect(actual).toBe(expected);
  });
  test('triggers an alert and throws an error if reactions object is empty', () => {
    const alert = jest.fn();
    const message = 'No active reactions were found. Make sure that you are logged in and that a reaction is active';
    const testState = { modules: {}, reactions: {} };
    const testFunc = () => { getActiveReactionId(alert)(testState); };
    expect(testFunc).toThrow(message);
    expect(alert).toBeCalled();
  });
  test('triggers an alert and throws an error if no active reactions are found', () => {
    const alert = jest.fn();
    const message = 'No active reactions were found. Make sure that you are logged in and that a reaction is active';
    const testState = {
      modules: state.modules,
      reactions: { 123: { active: false }, 456: { active: false } },
    };
    const testFunc = () => { getActiveReactionId(alert)(testState); };
    expect(testFunc).toThrow(message);
    expect(alert).toBeCalled();
  });
});


describe('entities getters', () => {
  // add tests for Heater and Air

  test('module state', () => {
    const actual = activeModuleState(state, mockGetters);
    expect(actual).toHaveProperty('Air', false);
    expect(actual).toHaveProperty('Lamp', false);
    expect(actual).toHaveProperty('Heater', false);
  });

  test('module params', () => {
    const actual = activeModuleParams(state, mockGetters);
    expect(actual).toHaveProperty('Air', expect.objectContaining({ start: 0 }));
    expect(actual).toHaveProperty('Lamp', expect.objectContaining({ stop: 0 }));
    expect(actual).toHaveProperty('Heater', expect.objectContaining({ level: 0 }));
  });

  test('module limits', () => {
    const actual = activeModuleLimits(state, mockGetters);
    expect(actual).toHaveProperty('Heater', expect.objectContaining({ 'HIGH-value': 100 }));
  });

  test('module heater', () => {
    const actual = heater(state, mockGetters);
    expect(actual).toHaveProperty('level', 0);
    expect(actual).toHaveProperty('powerOn', false);
    expect(actual).toHaveProperty('minTemp', 0);
    expect(actual).toHaveProperty('maxTemp', 100);
    expect(actual).toHaveProperty('level', 0);
  });
});
