import { mutations } from '@/store/entities.module';
import mockState from '../../mockState';

const state = mockState.entities;
const { MUTATE_MODULE_PARAMS } = mutations;

describe('MUTATE_MODULE_PARAMS mutation', () => {
  test('sets MV1 lamp level 40', () => {
    const newParams = { level: 40 };
    MUTATE_MODULE_PARAMS(state, {
      moduleName: 'MV1',
      actuatorType: 'Lamp',
      newParams,
    });
    const actual = state.modules.MV1.parameters.Lamp;
    const expected = { start: 0, stop: 0, level: '40' };
    expect(actual).toEqual(expected);
  });
});
