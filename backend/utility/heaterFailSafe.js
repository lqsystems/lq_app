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

const constructHeaterToggleMsg = ({ reactionId, moduleId, state, level }) => ({
  dest: moduleId,
  id: reactionId,
  data: {
    state,
    level,
    time: Date.now(),
    switch: "Heater",
    start: 0,
    stop: 0
  }
});


const toggleHeater = (
  { userRAssets, HWProc, emitModuleUpdate },
  state
) => module => {
  // set server state
  setHeaterState(userRAssets, module, state);

  // send hardware broker message
  const level = getHeaterLevel(userRAssets, module);
  const msg = constructHeaterToggleMsg({
    state,
    level,
    reactionId: "1234",
    moduleId: module
  });

  HWProc.send(msg);

  // notify client of update
  emitModuleUpdate({ failSafe: true, moduleId: module, heaterState: state });
};


const heaterFailSafe = (dependencies, message, tolerance) => {
    const { userRAssets } = dependencies;
    const { module, Temperature } = message;
    const temp = Number(Temperature);
    const highLimit = Number(getHeaterLimits(userRAssets, module)['HIGH-value']);
    const isHeaterOn = getHeaterState(userRAssets, module) === true;
    const turnHeaterOff = toggleHeater(dependencies, false);

    if (temp > highLimit + tolerance) {
        if (isHeaterOn) {
            console.log()
            console.log(`'${module}' temp reached '${temp}'. Upper limit is '${highLimit}'. Turning heater OFF! ${Date()}`)
            console.log()
            turnHeaterOff(module);
        }
    }
}

module.exports = {
    toggleHeater,
    heaterFailSafe,
    constructHeaterToggleMsg,
    // getters and setters
    getAllModulesActive,
    getModuleLimits,
    getModuleState,
    getModuleParams,
    getHeaterState,
    getHeaterLimits,
    getHeaterLevel,
    setHeaterState,
};