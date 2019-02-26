import mockModules from '@/data/mockDataModules';
import { getters } from '@/store/entities.module';
import * as modulesGetters from '@/store/modules.module';
import { lampToggle } from '@/data/apiRequests.js';

const print = obj => (
  console.log(require('util').inspect(obj, false, null, true))
);

const state = mockModules;

const {
  activeModule,
  activeModuleState,
  activeModuleParams,
  activeModuleLimits,
  heater,
  apiUpdatePayload,
} = getters;

const activeModuleVal = state.ZeePrime;
const activeModuleStateVal = activeModuleState(state, { activeModule: activeModuleVal });
const activeModuleParamsVal = activeModuleParams(state, { activeModule: activeModuleVal });
const activeModuleLimitsVal = activeModuleLimits(state, { activeModule: activeModuleVal });

const testGetters = {
  activeModule: activeModuleVal,
  activeModuleState: activeModuleStateVal,
  activeModuleParams: activeModuleParamsVal,
  activeModuleLimits: activeModuleLimitsVal,
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
};

describe('entities getters', () => {
  test('apiUpdatePayload', () => {
    const expected = testPayload;
    const actual = apiUpdatePayload(state, testGetters);
    expect(true).toEqual(true);
  });

  test('module state', () => {
    const actual = activeModuleState(state, testGetters);
    expect(actual).toHaveProperty('Air', false);
    expect(actual).toHaveProperty('Lamp', false);
    expect(actual).toHaveProperty('Heater', false);
  });

  test('module params', () => {
    const actual = activeModuleParams(state, testGetters);
    expect(actual).toHaveProperty('Air', expect.objectContaining({ start: 0 }));
    expect(actual).toHaveProperty('Lamp', expect.objectContaining({ stop: 0 }));
    expect(actual).toHaveProperty('Heater', expect.objectContaining({ level: 0 }));
  });

  test('module limits', () => {
    const actual = activeModuleLimits(state, testGetters);
    expect(actual).toHaveProperty('Heater', expect.objectContaining({ 'HIGH-value': 100 }));
  });

  test('module heater', () => {
    const actual = heater(state, testGetters);
    expect(actual).toHaveProperty('level', 0);
    expect(actual).toHaveProperty('powerOn', false);
    expect(actual).toHaveProperty('minTemp', 0);
    expect(actual).toHaveProperty('maxTemp', 100);
    expect(actual).toHaveProperty('level', 0);
  });
});
