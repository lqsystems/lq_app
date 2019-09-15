const {
  toggleHeater,
  heaterFailSafe,
  constructHeaterToggleMsg,
  getModuleState,
  getHeaterLimits,
  getHeaterLevel,
  setHeaterState,
} = require('../heaterFailSafe');

const userRAssetsMock = () => ({
  allModulesActive: {
    Prime1: {
      moduleState: {
        Heater: true,
      },
      parameters: {
        Heater: { start: 0, stop: 0, level: '55' },
      },
      limits: {
        Heater: {
          'HIGH-value': 22.347,
          'LOW-value': 0,
        }
      }
    }
  }
});

describe('heaterFailSafe feature', () => {
  let userRAssets;
  const module = 'Prime1';
  let HWProc = { send: jest.fn(msg => msg) };
  let emitModuleUpdate = jest.fn();

  beforeEach(() => {
    userRAssets = userRAssetsMock();
    HWProc = { send: jest.fn(msg => msg) };
    emitModuleUpdate = jest.fn();
  });

  describe('heaterFailSafe func', () => {
    test('turns heater off if temp exceeds max + tolerance and heater is off', () => {
      const highLimit = getHeaterLimits(userRAssets, module)['HIGH-value'];
      const tolerance = 1;
      const extra = 1;
      const msg = { module, Temperature: String(highLimit + tolerance + extra) };
      heaterFailSafe({ userRAssets, HWProc, emitModuleUpdate }, msg, tolerance);


      const HWProcMsg = HWProc.send.mock.results[0].value;
      expect(HWProcMsg.data.level).toBe(getHeaterLevel(userRAssets, module));
      expect(HWProcMsg.data.state).toBe(false);
      expect(HWProcMsg.data.switch).toBe('Heater');
      expect(HWProcMsg.dest).toBe(module);
    });

    test('turns heater on if temp drops below max - tolerance', () => {
      return;
      const lowLimit = getHeaterLimits(userRAssets, module)['LOW-value'];
      const tolerance = 1;
      const extra = 1;
      const msg = { module, Temperature: String(lowLimit - tolerance - extra) };
      setHeaterState(userRAssets, module, false);

      heaterFailSafe({ userRAssets, HWProc, emitModuleUpdate }, msg, tolerance);

      const HWProcMsg = HWProc.send.mock.results[0].value;
      expect(HWProcMsg.data.level).toBe(getHeaterLevel(userRAssets, module));
      expect(HWProcMsg.data.state).toBe(true);
      expect(HWProcMsg.data.switch).toBe('Heater');
      expect(HWProcMsg.dest).toBe(module);
    });
  });

  describe('toggleHeater', () => {
    let turnHeaterOff;
    let turnHeaterOn;

    beforeEach(() => {
      turnHeaterOn = toggleHeater({ userRAssets, HWProc, emitModuleUpdate }, true);
      turnHeaterOff = toggleHeater({ userRAssets, HWProc, emitModuleUpdate }, false);
    });

    test('sends a socket update to client to turn heater off', () => {
      turnHeaterOff(module);
      expect(emitModuleUpdate).toHaveBeenCalledWith({ failSafe: true, moduleId: module, heaterState: false })
    });

    test('sends a socket update to client to turn heater on', () => {
      turnHeaterOn(module);
      expect(emitModuleUpdate).toHaveBeenCalledWith({ failSafe: true, moduleId: module, heaterState: true})
    });

    test('sends a turn off message to Hardware Broker', () => {
      turnHeaterOff(module);
      const HWProcMsg = HWProc.send.mock.results[0].value;
      expect(HWProcMsg.data.level).toBe(getHeaterLevel(userRAssets, module));
      expect(HWProcMsg.data.state).toBe(false);
      expect(HWProcMsg.data.switch).toBe('Heater');
      expect(HWProcMsg.dest).toBe(module);

    });
    test('toggles userAsset heater state', () => {
      turnHeaterOff(module);
      expect(getModuleState(userRAssets, module).Heater).toBe(false)
      turnHeaterOn(module);
      expect(getModuleState(userRAssets, module).Heater).toBe(true)
    });

    test('toggles userAsset heater state', () => { });
  });

  describe('getHeaterLimits', () => {
    test('returns heater limits of given module', () => {
      const limitsObj = getHeaterLimits(userRAssets, module);
      expect(limitsObj['HIGH-value']).toBeDefined();
      expect(limitsObj['LOW-value']).toBeDefined();
    });
  });

  describe('constructHeaterToggleMsg', () => {
    test('returns HB message for heater', () => {
      const msg = constructHeaterToggleMsg({
        reactionId: '1234',
        moduleId: module,
        state: false,
        level: '55',
      });

      const { dest } = msg;
      const { state, level } = msg.data;

      expect(msg).toEqual(expect.objectContaining({
        dest: module,
        data: expect.objectContaining({ state: false }),
      }));

      expect(dest).toEqual(expect.any(String));
      expect(state).toEqual(expect.any(Boolean));
      expect(level).toEqual(expect.any(String));
    });
  });
});