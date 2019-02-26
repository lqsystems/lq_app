import { compare, lampToggle } from '@/data/apiRequests';

describe('example', () => {
  test('true to be true', () => {
    const actual = compare;
    const expected = lampToggle;
    expect(actual).toEqual(expected);
  });
});
