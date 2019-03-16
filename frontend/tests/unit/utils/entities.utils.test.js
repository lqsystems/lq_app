import { validatePayload } from '@/utils/entities.utils';


describe('validate payload', () => {
  test('throws an error if props have undefined values', () => {
    const testObj = { foo: null, bang: 'baz', biz: undefined };
    const testFunc = () => { validatePayload(testObj); };
    expect(testFunc).toThrow('The following keys had undefined values: foo, biz');
  });
  test('does not throw an error if all props are defined', () => {
    const testObj = { foo: 0, bang: '', biz: 'bang' };
    const testFunc = () => { validatePayload(testObj); };
    expect(testFunc).not.toThrow();
  });
});
