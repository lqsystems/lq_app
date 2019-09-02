




/* 
toggleHeater = ({ userRAssets, HWProc, emitModuleUpdate }, state) => module =>
  setHeaterState(userRAssets, module, state);
  const msg = constructHeaterToggleMsg(true);
  HWProc(msg);
  emitModuleUpdate({ failSafe: true, module, heaterState: state});

heaterFailSafe(dependencies, message, tolerance)
  { module, Temperature } = message;
  highLimit = getHeaterLimits(module).HIGH
  lowLimit = getHeaterLimits(module).LOW
  turnHeaterOn = toggleHeater(dependencies, true);
  turnHeaterOff = toggleHeater(dependencies, false);

   if (temp > highLimit + tolerance) 
     turnHeaterOff(module)
   if (temp < lowLimit - tolerance)
     turnHeaterOn(module)
*/


// heaterFailSafe(hwProc, userRAssets)(message, tolerance)
/*
  turns heater OFF if heater is beyond the tolerance
    toggles appropriate heater state value
    sends turn off message to hardware broker
  
  setup
    gets current HIGH/LOW limits for given module
    deconstructs server message
      moduleId
      Temp

  main
   if (temp > highLimit + tolerance) 
     turnHeaterOff
       send a message to hardware broker
         format HB message
       update state
         call a state setter
  
    if (temp < lowLimit - tolerance)
     turnHeaterOn
*/
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
          'HIGH-value': 100,
          'LOW-value': 0,
        }
      }
    }
  }
});

const getAllModulesActive = (userRAssets, moduleId) => userRAssets.allModulesActive[moduleId];
const getModuleLimits = (userRAssets, moduleId) => getAllModulesActive(userRAssets, moduleId).limits;
const getModuleState = (userRAssets, moduleId) => getAllModulesActive(userRAssets, moduleId).moduleState;
const getModuleParams = (userRAssets, moduleId) => getAllModulesActive(userRAssets, moduleId).parameters;
const getHeaterState = (userRAssets, moduleId) => getModuleState(userRAssets, moduleId).Heater;
const getHeaterLimits = (userRAssets, moduleId) => getModuleLimits(userRAssets, moduleId).Heater;
const getHeaterLevel = (userRAssets, moduleId) => getModuleParams(userRAssets, moduleId).Heater.level;
const setHeaterState = (userRAssets, moduleId, state) => {
  const stateObj = getModuleState(userRAssets, moduleId);
  stateObj.Heater = state;
};

//ffff
const constructHeaterToggleMsg = ({
  reactionId,
  moduleId,
  state,
  level,
}) => ({
  dest: moduleId,
  id: reactionId,
  data: {
    state,
    level,
    time: Date.now(),
    switch: 'Heater',
    start: 0,
    stop: 0,
  }
});



// toggleHeater = ({ userRAssets, HWProc, emitModuleUpdate }, state) => module => {
//   setHeaterState(userRAssets, module, state);
//   const msg = constructHeaterToggleMsg(true);
//   HWProc(msg);
//   emitModuleUpdate({ failSafe: true, module, heaterState: state});
//}

describe('heaterFailSafe', () => {
  let foo;
  let userRAssets;
  const module = 'Prime1';
  const HWProc = { send: jest.fn(msg => msg) };
  const emitModuleUpdate = jest.fn();

  beforeEach(() => {
    foo = 'bar';
    userRAssets = userRAssetsMock();
  });

  // jjjj 
  describe('toggleHeater', () => {
    toggleHeater = ({ userRAssets, HWProc, emitModuleUpdate }, state) => module => {
      // set server state
      setHeaterState(userRAssets, module, state);

      // send hardware broker message
      const level = getHeaterLevel(userRAssets, module);
      const msg = constructHeaterToggleMsg({
        state,
        level,
        reactionId: '1234',
        moduleId: module,
      });

      HWProc.send(msg);

      // notify client of update
      emitModuleUpdate({ failSafe: true, module, heaterState: state});
    }

    test('sends a toggle message to Hardware Broker', () => {
      const turnHeaterOff = toggleHeater({ userRAssets, HWProc, emitModuleUpdate }, false);

      const testMsg =
      {
        dest: module,
        id: '5d620fe4c6c29378d2aacb2c',
        data: {
          time: 1567387015268,
          switch: 'Heater',
          state: false,
          start: 0,
          stop: 0,
          level: '55'
        }
      }
       
      turnHeaterOff(module);
      // const HWProcThing = HWProc.mock.results.value;
      const HWProcMsg = HWProc.send.mock.results[0].value;
      // console.log(HWProcMsg  )
      expect(HWProcMsg.data.level).toBe(getHeaterLevel(userRAssets, module))

    });
    test('toggles userAsset heater state', () => {
      const turnHeaterOn = toggleHeater({ userRAssets, HWProc, emitModuleUpdate }, true);
      const turnHeaterOff = toggleHeater({ userRAssets, HWProc, emitModuleUpdate }, false);

      turnHeaterOff(module);
      expect(getModuleState(userRAssets, module).Heater).toBe(false)
      turnHeaterOn(module);
      expect(getModuleState(userRAssets, module).Heater).toBe(true)
    });

    test('toggles userAsset heater state', () => { });
  });

  // test('updates server app state, turns heater hardware on sends a message, sends socket message to UI', () => {

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






/**
 // **** start here

    const module = 'Prime1';
    // console.log(userRAssets.allModulesActive.Prime1);
    // console.log(userRAssets);

    const getAllModulesActive = (userRAssets, moduleId) => userRAssets.allModulesActive[moduleId];
    const getModuleLimits = (userRAssets, moduleId) => getAllModulesActive(userRAssets, moduleId).limits;
    const getHeaterLimits = (userRAssets, moduleId) => getModuleLimits(userRAssets, moduleId).Heater;

    //   console.log('fdsafdsafdsa', userRAssets)
      const fdsa = getModuleLimits(userRAssets, module); 
      if (fdsa) {
      const res = getHeaterLimits (userRAssets, module); 
        // console.log('fdsafdsafdsa', res)
      }

      // ***** end here
 */