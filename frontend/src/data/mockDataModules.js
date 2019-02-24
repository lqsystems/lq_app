const modules = [
  {
    mod_name: 'ZeePrime',
    mod_active: true,
    title: 'ZeePrime',
    reactions: [
      {
        id: '5c536562d0e2ce03f1524c9c',
        name: 'test reaction',
        module: 'ZeePrime',
        media: [
          'syrup and spiders',
        ],
        procedure: [],
        notes: [
          'started 1 / 21 Jan 2019',
        ],
        active: false,
      },
      {
        id: '5c6b66b88fd25d3cd9603399',
        name: 'sipra-awesome',
        module: 'ZeePrime',
        media: [
          'Minerals and stuff',
        ],
        procedure: [],
        notes: [
          'Best reactions yet',
        ],
        active: false,
      },
    ],
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
      SensorOnOff: {
        ctrlValue: 5,
      },
      Air: {
        start: 0,
        stop: 0,
      },
      Lamp: {
        start: 0,
        stop: 0,
        level: 0,
      },
      Heater: {
        start: 0,
        stop: 0,
        level: 0,
      },
      water: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      inoculum: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      mixer: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      extraction: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      forward: {
        level: 0,
      },
      backwards: {
        level: 0,
      },
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
  {
    mod_name: 'Dosis1',
    mod_active: false,
    title: 'Dosis1',
    reactions: [
      {
        id: '5c4acf72cab072313a1f7ad6',
        name: '??? A Fourth Reaction By A new User ???',
        module: 'Dosis1',
        media: [
          'Peptone Grease',
        ],
        procedure: [],
        notes: [
          'Freaky Fried Chicken',
        ],
        ModuleState: {
          time: 1548408907868,
          mid: 'Dosis1',
          active: 'OFF',
        },
        active: false,
      },
    ],
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
      SensorOnOff: {
        ctrlValue: 5,
      },
      Air: {
        start: 0,
        stop: 0,
      },
      Lamp: {
        start: 0,
        stop: 0,
        level: 0,
      },
      Heater: {
        start: 0,
        stop: 0,
        level: 0,
      },
      water: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      inoculum: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      mixer: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      extraction: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      forward: {
        level: 0,
      },
      backwards: {
        level: 0,
      },
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
  {
    mod_name: 'Dosis2',
    mod_active: false,
    title: 'Dosis2',
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
      SensorOnOff: {
        ctrlValue: 5,
      },
      Air: {
        start: 0,
        stop: 0,
      },
      Lamp: {
        start: 0,
        stop: 0,
        level: 0,
      },
      Heater: {
        start: 0,
        stop: 0,
        level: 0,
      },
      water: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      inoculum: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      mixer: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      extraction: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      forward: {
        level: 0,
      },
      backwards: {
        level: 0,
      },
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
  {
    mod_name: 'Filter',
    mod_active: false,
    title: 'Filter',
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
      SensorOnOff: {
        ctrlValue: 5,
      },
      Air: {
        start: 0,
        stop: 0,
      },
      Lamp: {
        start: 0,
        stop: 0,
        level: 0,
      },
      Heater: {
        start: 0,
        stop: 0,
        level: 0,
      },
      water: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      inoculum: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      mixer: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      extraction: {
        'material-rate': 0,
        'material-amount': 0,
        level: 0,
      },
      forward: {
        level: 0,
      },
      backwards: {
        level: 0,
      },
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
];

export default modules;
