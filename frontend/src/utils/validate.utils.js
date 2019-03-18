export const getUndefinedProps = (obj) => {
  const undefinedProps = [];

  if (typeof obj === 'boolean') {
    return [];
  }

  Object.keys(obj).forEach((key) => {
    const keyVal = obj[key];
    if (keyVal === null || keyVal === undefined) {
      undefinedProps.push(key);
    }
  });

  return undefinedProps;
};

export const throwUndefinedPropError = (undefinedProps) => {
  if (undefinedProps.length > 0) {
    const joinedProps = undefinedProps.length > 1 ? undefinedProps.join(', ') : undefinedProps[0];
    const message = `The following keys had undefined values: ${joinedProps}`;
    throw new Error(message);
  }
};

export const checkForUndefinedProps = (undefinedPropGetter, errorThrower) => (obj) => {
  const undefinedProps = undefinedPropGetter(obj);
  errorThrower(undefinedProps);
};
