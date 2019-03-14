export const prettyPrint = (tag = '', obj) => {
  if (typeof tag !== 'string') {
    throw new Error('prettyPrint expects the first argument to be a string');
  }
  console.log(tag, JSON.stringify(obj, null, 2));
};
