// Modules

const modules = [
  'sensorData',
  'ui',
  'reactions',
];

// active-reactor,

const ui = {
  activeControl: 'HELLO',
};

const environmentControls = {
  togglePower(state, type) {
    const { powerOn } = state[type];
    state[type].powerOn = !powerOn;
  },
  setLevel(state, type, level) {
    state[type].level = level;
  },

  mutations: [
    'togglePower',
    'setTime',
    'setLevel',
    'setLimit',
  ],
};

// environmentControl types
const HEATER = 'heater';
const AIR = 'air';
const LIGHT = 'light';
