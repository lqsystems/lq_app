const modules = {
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

export default modules;
