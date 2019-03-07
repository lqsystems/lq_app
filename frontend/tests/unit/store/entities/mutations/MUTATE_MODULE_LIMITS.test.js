import { mutations } from '@/store/entities.module';
import mockState from '../../mockState';

const state = mockState.entities;
const { MUTATE_MODULE_LIMITS } = mutations;

describe('MUTATE_MODULE_LIMITS mutation', () => {
  test('sets ZeePrime Heater limit LOW-value to 20', () => {
    const newLimits = { 'LOW-value': 20 };
    MUTATE_MODULE_LIMITS(state, 'ZeePrime', 'Heater', newLimits);
    const actual = state.modules.ZeePrime.limits.Heater;
    const expected = {
      HIGH: false, LOW: true, Sensor: 'temperature', 'HIGH-value': 100, 'LOW-value': 20, active: false,
    };
    expect(actual).toEqual(expected);
  });
});
