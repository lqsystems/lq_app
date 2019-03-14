import mockState from '../../mockState';
import { getters, getActiveReactionId, getApiUpdatePayload } from '@/store/entities.module';

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
const activeReactionIdVal = getActiveReactionId(state);

const mockGetters = {
  selectedModuleName: 'ZeePrime',
  activeModule: activeModuleVal,
  activeModuleState: activeModuleStateVal,
  activeModuleParams: activeModuleParamsVal,
  activeModuleLimits: activeModuleLimitsVal,
  activeReactionId: activeReactionIdVal,
};

const testPayload = {
  mid: 'ZeePrime',
  allStates: {
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
  },
  activeId: '5c536562d0e2ce03f1524c9c',
  activeSwitch: 'ReactionActive-5c536562d0e2ce03f1524c9c',
  changes: [
    'Lamp',
  ],
  'ZeePrime-Lamp-parameters': {
    start: 0,
    stop: 0,
    level: 0,
  },
  'ZeePrime-Lamp-limits': {},
};
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


describe('entities getters', () => {
  test('getApiUpdatePayload', () => {
    const expected = testPayload;
    const actual = getApiUpdatePayload('Lamp')(state, mockGetters);
    expect(expected).toEqual(actual);
  });

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
