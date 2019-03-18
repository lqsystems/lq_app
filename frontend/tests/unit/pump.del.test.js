describe('pump', () => {
  test('vue should equal hb', () => {
    const actual = {
      mid: 'ZeePrime',
      allStates: {
        SensorOnOff: false, Air: false, Lamp: false, Heater: false, water: true, inoculum: false, mixer: false, extraction: false, forward: false, backwards: false,
      },
      activeId: '5c6b66b88fd25d3cd9603399',
      activeSwitch: 'ReactionActive-5c6b66b88fd25d3cd9603399',
      changes: ['water'],
      'ZeePrime-water-parameters': { 'material-rate': 0, 'material-amount': 0, level: '100' },
      'ZeePrime-water-limits': {},
    };
    const expected = {
      mid: 'ZeePrime',
      allStates: {
        SensorOnOff: false, Air: false, Lamp: false, Heater: false, water: true, inoculum: false, mixer: false, extraction: false, forward: false, backwards: false,
      },
      changes: ['water'],
      activeSwitch: 'ReactionActive-5c82cd2a936f6f487f619eb0',
      activeId: '5c82cd2a936f6f487f619eb0',
      'ZeePrime-extraction-parameters': { 'material-rate': '0', 'material-amount': '0', level: '100' },
      'ZeePrime-extraction-limits': {},
      'ZeePrime-water-parameters': { 'material-rate': '0', 'material-amount': '0', level: '100' },
      'ZeePrime-water-limits': {},
    };
    expect(actual).toBe(expected);
  });
});
