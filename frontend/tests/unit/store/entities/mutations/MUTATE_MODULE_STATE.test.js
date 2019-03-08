import { mutations } from '@/store/entities.module';
import mockState from '../../mockState';

const state = mockState.entities;
const { MUTATE_MODULE_STATE } = mutations;

describe('MUTATE_MODULE_STATE mutation', () => {
  test('sets Air state to true', () => {
    MUTATE_MODULE_STATE(state, {
      moduleName: 'ZeePrime',
      actuatorType: 'Air',
      newState: true,
    });
    const actual = state.modules.ZeePrime.moduleState.Air;
    const expected = true;
    expect(actual).toBe(expected);
  });
});
