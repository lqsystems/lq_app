const obj = {
  mid: 'Prime1',
  allStates: {
    SensorOnOff: true,
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
  changes: ['SensorOnOff'],
  activeSwitch: 'ReactionActive-5d181d38cde99fadc00f4f31',
  activeId: '5d181d38cde99fadc00f4f31',
  'Prime1-SensorOnOff-parameters': { ctrlValue: '5' },
  'Prime1-SensorOnOff-limits': {},
};

const constructSensorToggleRequestBody = ({
  moduleName, reactionId, isOn, delay,
}) => {
  const params = `${moduleName}-SensorOnOff-parameters`;
  const activeSwitch = `ReactionActive-${reactionId}`;

  return {
    activeSwitch,
    mid: moduleName,
    allStates: { SensorOnOff: isOn },
    activeId: reactionId,
    [params]: { ctrlValue: delay.toString() },
    changes: ['SensorOnOff'],
  };
};
const testRid = '5d181d38cde99fadc00f4f31';

test('Prime1 toggle on delay 5', () => {
  const requestBody = constructSensorToggleRequestBody({
    moduleName: 'Prime1',
    reactionId: testRid,
    isOn: true,
    delay: 5,
  });

  const {
    mid, allStates, changes, activeSwitch, activeId,
  } = requestBody;
  expect(mid).toBe('Prime1');
  expect(allStates.SensorOnOff).toBe(true);
  expect(activeId).toBe(testRid);
  expect(requestBody).toHaveProperty(`${mid}-SensorOnOff-parameters`);
  expect(requestBody[`${mid}-SensorOnOff-parameters`].ctrlValue).toBe('5');
  expect(activeSwitch).toBe(`ReactionActive-${testRid}`);
  expect(changes[0]).toBe('SensorOnOff');
  expect(Object.keys(requestBody).length).toBe(6);
});
