import mockState from '../../mockState';
import { getApiUpdatePayload } from '@/store/entities.module';
import { mockGetters } from './getters.test';

const basePayload = {
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
};


const state = mockState.entities;

describe('getApiUpdatePayload', () => {
  test('returns payload to turn off water', () => {
    const waterPayloadProps = {
      changes: ['water'],
      'ZeePrime-water-parameters': { 'material-rate': '0', 'material-amount': '0', level: '100' },
      'ZeePrime-water-limits': {},
    };

    const waterUpdatePayload = Object.assign({}, basePayload, waterPayloadProps);
    const expected = waterUpdatePayload;
    const actual = getApiUpdatePayload('water')(state, mockGetters);
    expect(expected).toEqual(actual);
  });

  test('returns payload to update lamp', () => {
    const lampPayloadProps = {
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

    const updateLampPayload = Object.assign({}, basePayload, lampPayloadProps);


    const expected = updateLampPayload;
    const actual = getApiUpdatePayload('Lamp')(state, mockGetters);
    expect(actual).toEqual(expected);
  });
});
