const state = {
  entities: {
    modules: {
      ZeePrime: {
        mod_name: 'ZeePrime',
        mod_active: true,
        title: 'ZeePrime',
        reactions: ['5c536562d0e2ce03f1524c9c', '5c6b66b88fd25d3cd9603399'],
        'reaction-id': 0,
        moduleState: {
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
        parameters: {
          SensorOnOff: { ctrlValue: 5 },
          Air: { start: 0, stop: 0 },
          Lamp: { start: 0, stop: 0, level: 0 },
          Heater: { start: 0, stop: 0, level: 0 },
          water: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          inoculum: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          mixer: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          extraction: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          forward: { level: 0 },
          backwards: { level: 0 },
        },
        limits: {
          Heater: {
            HIGH: false,
            LOW: true,
            Sensor: 'temperature',
            'HIGH-value': 100,
            'LOW-value': 0,
            active: false,
          },
        },
      },
      MV1: {
        mod_name: 'MV1',
        mod_active: false,
        title: 'MV1',
        reactions: [],
        'reaction-id': 0,
        moduleState: {
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
        parameters: {
          SensorOnOff: { ctrlValue: 5 },
          Air: { start: 0, stop: 0 },
          Lamp: { start: 0, stop: 0, level: 0 },
          Heater: { start: 0, stop: 0, level: 0 },
          water: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          inoculum: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          mixer: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          extraction: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          forward: { level: 0 },
          backwards: { level: 0 },
        },
        limits: {
          Heater: {
            HIGH: false,
            LOW: true,
            Sensor: 'temperature',
            'HIGH-value': 100,
            'LOW-value': 0,
            active: false,
          },
        },
      },
      MV2: {
        mod_name: 'MV2',
        mod_active: false,
        title: 'MV2',
        reactions: [],
        'reaction-id': 0,
        moduleState: {
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
        parameters: {
          SensorOnOff: { ctrlValue: 5 },
          Air: { start: 0, stop: 0 },
          Lamp: { start: 0, stop: 0, level: 0 },
          Heater: { start: 0, stop: 0, level: 0 },
          water: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          inoculum: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          mixer: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          extraction: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          forward: { level: 0 },
          backwards: { level: 0 },
        },
        limits: {
          Heater: {
            HIGH: false,
            LOW: true,
            Sensor: 'temperature',
            'HIGH-value': 100,
            'LOW-value': 0,
            active: false,
          },
        },
      },
      System: {
        mod_name: 'System',
        mod_active: false,
        title: 'System',
        reactions: [],
        'reaction-id': 0,
        moduleState: {
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
        parameters: {
          SensorOnOff: { ctrlValue: 5 },
          Air: { start: 0, stop: 0 },
          Lamp: { start: 0, stop: 0, level: 0 },
          Heater: { start: 0, stop: 0, level: 0 },
          water: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          inoculum: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          mixer: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          extraction: { 'material-rate': 0, 'material-amount': 0, level: 0 },
          forward: { level: 0 },
          backwards: { level: 0 },
        },
        limits: {
          Heater: {
            HIGH: false,
            LOW: true,
            Sensor: 'temperature',
            'HIGH-value': 100,
            'LOW-value': 0,
            active: false,
          },
        },
      },
    },
    reactions: {
      '5c536562d0e2ce03f1524c9c': {
        id: '5c536562d0e2ce03f1524c9c',
        name: 'test reaction',
        module: 'ZeePrime',
        media: ['syrup and spiders'],
        procedure: [],
        notes: ['started 1 / 21 Jan 2019'],
        ModuleState: { time: 1551181612853, mid: 'ZeePrime', active: 'ON' },
        active: true,
      },
      '5c6b66b88fd25d3cd9603399': {
        id: '5c6b66b88fd25d3cd9603399',
        name: 'sipra-awesome',
        module: 'ZeePrime',
        media: ['Minerals and stuff'],
        procedure: [],
        notes: ['Best reactions yet'],
        ModuleState: { time: 1551161687698, mid: 'ZeePrime', active: 'OFF' },
        active: false,
      },
    },
  },
  modules: { selectedModuleName: 'ZeePrime', isFetching: true },
  ui: { environmentControls: { selectedControl: 'Air' } },
};

export default state;
