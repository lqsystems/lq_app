import { getPercentLabel } from '@/utils/controlPanel.utils';

describe('getPercentLabel func', () => {
  test('correct label with argument 0', () => {
    const actual = getPercentLabel(0);
    const expected = '0%';
    expect(actual).toBe(expected);
  });
  test('correct label with argument 45', () => {
    const actual = getPercentLabel([45]);
    const expected = '45%';
    expect(actual).toBe(expected);
  });
  test('correct label with argument null', () => {
    const actual = getPercentLabel(null);
    const expected = '0%';
    expect(actual).toBe(expected);
  });
  test('correct label with empty array as argument', () => {
    const actual = getPercentLabel([]);
    const expected = '0%';
    expect(actual).toBe(expected);
  });
  test('correct label with array with zero as argument', () => {
    const actual = getPercentLabel([0]);
    const expected = '0%';
    expect(actual).toBe(expected);
  });
});
