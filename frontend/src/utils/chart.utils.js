
const getRandomInteger = (min, max) => (
  Math.floor(Math.random() * (max - min) + min)
);

const getRandomNegative = () => (getRandomInteger(0, 10) > 5
  ? -1
  : 1);

const getRandomNumber = (min, max) => (
  Math.random() * (max - min) + min
);

const expoDataGenerator = ({
  dropRate, numPoints, step, yStart,
}) => {
  const getExpoNumber = x => (x >= 0 ? dropRate * -x * x + yStart : 0);
  // jj

  const genExpoDataSet = (numPoints) => {
    const points = [];

    const errorOptions = {
      start: 1.25,
      frequency: () => getRandomInteger(0, 10) < 10,
      magnitude: () => getRandomNegative() * getRandomNumber(0, 3),
    };
    const { start, frequency, magnitude } = errorOptions;

    for (let i = 0; i < numPoints; i += step) {
      const mag = magnitude();
      const linePoint = getExpoNumber(i);

      // eslint-disable-next-line no-nested-ternary
      const y = i < start
        ? linePoint
        : frequency()
          ? linePoint + mag
          : linePoint;

      points.push({
        x: i,
        y,
      });
    }
    return points;
  };

  return genExpoDataSet(numPoints);
};

const getStableErrorData = ({
  start, numPoints, stableVal, spreadUpper, spreadLower, step,
}) => {
  const points = [];
  let y;
  for (let i = start; i < numPoints; i += step) {
    y = i === start
      ? stableVal
      : stableVal + getRandomNumber(spreadLower * -1, spreadUpper);

    //    y = i % 2 === 0 ? y : -1 * y;
    points.push({
      x: i,
      y,
    });
  }

  return points;
};

const getRandomizedErrorData = ({
  start, numPoints, stableVal, spreadUpper, spreadLower, step, kFreq, magUpper,
}) => {
  const points = [];


  const errorOptions = {
    frequency: () => getRandomInteger(0, 10000) < (kFreq || 1000),
    magnitude: () => getRandomNegative() * getRandomNumber(0, magUpper || 0.2),
  };
  const { frequency, magnitude } = errorOptions;

  for (let i = start; i < numPoints; i += step) {
    const bigJump = magnitude();
    const littleJump = getRandomNumber(-1 * spreadLower, spreadUpper);
    const linePoint = stableVal;

    // eslint-disable-next-line no-nested-ternary
    const y = frequency()
      ? linePoint + bigJump
      : linePoint + littleJump;

    // y = i === start
    //   ? stableVal
    //   : stableVal + getRandomNumber(spreadLower * -1, spreadUpper);

    points.push({
      x: i,
      y,
    });
  }

  return points;
};

const getTempData = () => {
  const pointDensity = 1.2;

  const dataTemp1 = getRandomizedErrorData({
    start: 0,
    numPoints: 13,
    stableVal: 37,
    spreadUpper: 0.1,
    spreadLower: 0.1,
    step: pointDensity * 0.02,
  });

  const bigJumpOptions = {
    kFreq: 1000,
    magUpper: 3,
  };

  const dataTemp2 = getRandomizedErrorData({
    start: 13,
    numPoints: 15,
    stableVal: 37,
    spreadUpper: 0.1,
    spreadLower: 0.1,
    step: pointDensity * 0.03,
    ...bigJumpOptions,
  });

  const dataTemp3 = getRandomizedErrorData({
    start: 15,
    numPoints: 17,
    stableVal: 37,
    spreadUpper: 0.3,
    spreadLower: 0.2,
    step: pointDensity * 0.02,
  });

  return [...dataTemp1, ...dataTemp2, ...dataTemp3];
};

const getDOData = () => {
  const pointDensity = 1.2;

  const dataOD5 = getStableErrorData({
    start: 12,
    numPoints: 17,
    stableVal: 20,
    spreadUpper: 5,
    spreadLower: 8,
    step: pointDensity * 0.01,
  });

  const dataOD4 = getStableErrorData({
    start: 7.2,
    numPoints: 12,
    stableVal: 20,
    spreadUpper: 8,
    spreadLower: 6,
    step: pointDensity * 0.01,
  });

  const dataOD3 = getStableErrorData({
    start: 7,
    numPoints: 7.2,
    stableVal: 20,
    spreadUpper: 35,
    spreadLower: 5,
    step: pointDensity * 0.01,
  });

  const dataOD2 = getStableErrorData({
    start: 4.5,
    numPoints: 7,
    stableVal: 20,
    spreadUpper: 2,
    spreadLower: 2,
    step: pointDensity * 0.01,
  });

  const dataODDropExpo = expoDataGenerator({
    numPoints: 4.5,
    step: 0.1,
    yStart: 100,
    dropRate: 4,
  });

  const data = [
    ...dataODDropExpo,
    ...dataOD2,
    ...dataOD3,
    ...dataOD4,
    ...dataOD5,
  ];

  return data;
};

const getOpticalDensityData = () => [
  { x: 0, y: 0 },
  { x: 8, y: 30 },
  { x: 11, y: 85 },
  { x: 13, y: 110 },
  { x: 17, y: 145 },
];

export const parameterChartConfig = {
  DO: {
    title: 'Dissolved Oxygen',
    points: getDOData(),
    xAxisID: 'time',
    yAxisID: 'OD',
    yAxisConfig: {
      label: 'Percent',
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20,
      },
    },
  },
  TEMP: {
    title: 'Temperature',
    points: getTempData(),
    xAxisID: 'time',
    yAxisID: 'temp',
    yAxisConfig: {
      label: 'Degrees Celcius',
      ticks: {
        min: 25,
        max: 45,
        stepSize: 5,
      },
    },
  },
  OPTICALD: {
    title: 'Optical Density',
    points: getOpticalDensityData(),
    xAxisID: 'time',
    yAxisID: 'temp',
    yAxisConfig: {
      label: 'OD600',
      ticks: {
        min: 0,
        max: 160,
        stepSize: 20,
      },
    },
  },
};
