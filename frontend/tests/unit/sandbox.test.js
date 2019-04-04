const sensors = {
  ZeePrime: { OD: '-', temperature: '-' }, MV1: { OD: '4.336', temperature: '32.000' }, MV2: { OD: '1.934', temperature: '22.875' }, System: { OD: '-', temperature: '-' },
};

const formatSensorData = (sensorData, moduleName) => {
  const { temperature, OD } = sensorData[moduleName];
  const oneDecimalTemp = Number(temperature).toFixed(1);
  const twoDecimalOD = Number(OD).toFixed(2);
  return {
    temperature: oneDecimalTemp,
    OD: twoDecimalOD,
  };
};

describe('example', () => {
  test('true to be true', () => {
    const actual = formatSensorData(sensors, 'MV1');
    const expected = { OD: '4.34', temperature: '32.0' };
    expect(actual).toEqual(expected);
  });
});
