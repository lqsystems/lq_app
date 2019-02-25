const state = {
  ZeePrime: {
    mod_name: 'ZeePrime',
    mod_active: true,
    title: 'ZeePrime',
    reactions: ['5c536562d0e2ce03f1524c9c', '5c6b66b88fd25d3cd9603399'],
    'reaction-id': 0,
    moduleState: {
      SensorOnOff: false, Air: false, Lamp: false, Heater: false, water: false, inoculum: false, mixer: false, extraction: false, forward: false, backwards: false,
    },
    parameters: {
      SensorOnOff: { ctrlValue: 5 }, Air: { start: 0, stop: 0 }, Lamp: { start: 0, stop: 0, level: 0 }, Heater: { start: 0, stop: 0, level: 0 }, water: { 'material-rate': 0, 'material-amount': 0, level: 0 }, inoculum: { 'material-rate': 0, 'material-amount': 0, level: 0 }, mixer: { 'material-rate': 0, 'material-amount': 0, level: 0 }, extraction: { 'material-rate': 0, 'material-amount': 0, level: 0 }, forward: { level: 0 }, backwards: { level: 0 },
    },
    limits: {
      Heater: {
        HIGH: false, LOW: true, Sensor: 'temperature', 'HIGH-value': 100, 'LOW-value': 0, active: false,
      },
    },
  },
  Dosis1: {
    mod_name: 'Dosis1',
    mod_active: false,
    title: 'Dosis1',
    reactions: ['5c4acf72cab072313a1f7ad6'],
    'reaction-id': 0,
    moduleState: {
      SensorOnOff: false, Air: false, Lamp: true, Heater: false, water: false, inoculum: false, mixer: false, extraction: false, forward: false, backwards: false,
    },
    parameters: {
      SensorOnOff: { ctrlValue: 5 }, Air: { start: 0, stop: 0 }, Lamp: { start: 0, stop: 0, level: 0 }, Heater: { start: 0, stop: 0, level: 0 }, water: { 'material-rate': 0, 'material-amount': 0, level: 0 }, inoculum: { 'material-rate': 0, 'material-amount': 0, level: 0 }, mixer: { 'material-rate': 0, 'material-amount': 0, level: 0 }, extraction: { 'material-rate': 0, 'material-amount': 0, level: 0 }, forward: { level: 0 }, backwards: { level: 0 },
    },
    limits: {
      Heater: {
        HIGH: false, LOW: true, Sensor: 'temperature', 'HIGH-value': 100, 'LOW-value': 0, active: false,
      },
    },
  },
};

const UPDATE_MODULE_LIMITS = (state, reactorId, limitType, newLimits) => {
  const currentLimits = state[reactorId].limits;
  const currentLimitsValue = currentLimits[limitType];
  currentLimits[limitType] = Object.assign({}, currentLimitsValue, newLimits);
};

describe('UPDATE_MODULE_LIMITS mutation', () => {
  test('sets ZeePrime Heater limit LOW-value to 20', () => {
    const newLimits = { 'LOW-value': 20 };
    UPDATE_MODULE_LIMITS(state, 'ZeePrime', 'Heater', newLimits);
    const actual = state.ZeePrime.limits.Heater;
    const expected = {
      HIGH: false, LOW: true, Sensor: 'temperature', 'HIGH-value': 100, 'LOW-value': 20, active: false,
    };
    expect(actual).toEqual(expected);
  });
});

const UPDATE_MODULE_PARAMS = (state, reactorId, paramType, newParams) => {
  const currentParams = state[reactorId].parameters;
  const currentParamsValue = currentParams[paramType];
  currentParams[paramType] = Object.assign({}, currentParamsValue, newParams);
};

describe('UPDATE_MODULE_PARAMS mutation', () => {
  test('sets ZeePrime Lamp params to start: 100 stop: 200', () => {
    const newParams = { start: 100, stop: 200 };
    UPDATE_MODULE_PARAMS(state, 'ZeePrime', 'Lamp', newParams);
    const actual = state.ZeePrime.parameters.Lamp;
    const expected = { start: 100, stop: 200, level: 0 };
    expect(actual).toEqual(expected);
  });
  test('sets Dosis1 Heater params to level 65', () => {
    const newParams = { level: 65 };
    UPDATE_MODULE_PARAMS(state, 'Dosis1', 'Heater', newParams);
    const actual = state.Dosis1.parameters.Heater;
    const expected = { start: 0, stop: 0, level: 65 };
    expect(actual).toEqual(expected);
  });
});

const UPDATE_MODULE_STATE = (state, reactorId, stateType, newState) => {
  state[reactorId].moduleState[stateType] = newState;
};

describe('UPDATE_MODULE_STATE mutation', () => {
  test('sets Air state to true', () => {
    UPDATE_MODULE_STATE(state, 'ZeePrime', 'Air', true);
    const actual = state.ZeePrime.moduleState.Air;
    const expected = true;
    expect(actual).toBe(expected);
  });
  test('sets Lamp state to false', () => {
    UPDATE_MODULE_STATE(state, 'Dosis1', 'Lamp', false);
    const actual = state.Dosis1.moduleState.Lamp;
    const expected = false;
    expect(actual).toBe(expected);
  });
});
