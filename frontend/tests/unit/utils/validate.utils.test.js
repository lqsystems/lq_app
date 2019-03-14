import { checkForUndefinedProps, getUndefinedProps, throwUndefinedPropError } from '@/utils/validate.utils';

describe('checkForUndefinedProps functions', () => {
  test('throw an error if properties are undefined', () => {
    const testObj = { foo: null, bang: 'baz', biz: undefined };
    const testFunc = () => {
      checkForUndefinedProps(getUndefinedProps, throwUndefinedPropError)(testObj);
    };
    expect(testFunc).toThrow('The following keys had undefined values: foo, biz');
  });
  test('don\'t throw an error if properties are defined', () => {
    const testObj = { foo: 'bar', bang: 'baz', biz: 'bang' };
    const testFunc = () => {
      checkForUndefinedProps(getUndefinedProps, throwUndefinedPropError)(testObj);
    };
    expect(testFunc).not.toThrow();
  });
  test('don\'t throw an error if properties are 0 or empty strings', () => {
    const testObj = { foo: 0, bang: '', biz: 'bang' };
    const testFunc = () => {
      checkForUndefinedProps(getUndefinedProps, throwUndefinedPropError)(testObj);
    };
    expect(testFunc).not.toThrow();
  });
});
