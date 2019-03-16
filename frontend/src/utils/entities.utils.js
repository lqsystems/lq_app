import { checkForUndefinedProps, getUndefinedProps, throwUndefinedPropError } from '@/utils/validate.utils';

export const getModuleByReactionId = state => (reactionId) => {
  const { reactions, modules } = state;
  const matchedReaction = reactions[reactionId];
  const moduleName = matchedReaction ? matchedReaction.module : null;
  return moduleName ? modules[moduleName] : {};
};

// TODO: refactor to return only the diff and not the whole mutation payload
export const diffStatesOnUpdateMessage = (
  stateUpdateMessage,
  currentEntitiesState,
  moduleGetter,
  objectDiffGetter,
) => {
  const reactionId = Object.keys(stateUpdateMessage)[0];
  const newState = stateUpdateMessage[reactionId].state;
  const module = moduleGetter(currentEntitiesState)(reactionId);
  const currentModuleState = module.moduleState;
  const stateDiff = objectDiffGetter(currentModuleState, newState);

  const isModuleObjEmpty = Object.keys(module).length === 0;
  const isDiffObjEmpty = Object.keys(stateDiff).length === 0;

  console.log(' Current State ');
  console.log(currentModuleState);

  console.log(' New State ');
  console.log(newState);

  console.log(' State Diff ');
  console.log(stateDiff);

  if (!isModuleObjEmpty && !isDiffObjEmpty) {
    // returns an array because future implementations of this function may need deal with
    // multiple state updates other than just moduleState (eg. limit, or level states)
    // for now we only need to worry about the heater moduleState changing
    return [
      {
        moduleName: module.mod_name,
        actuatorType: 'Heater',
        newState: stateDiff.Heater,
      },
    ];
  }

  return [];
};


export const validatePayload = checkForUndefinedProps(getUndefinedProps, throwUndefinedPropError);
