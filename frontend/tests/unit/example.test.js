const myFunc = (message) => {
  if (message && (message[0] === 'Not logged in')) {
    return true;
  }

  return false;
};

describe('example', () => {
  test('true to be true', () => {
    const result = myFunc([]);
    expect(result).toBe(false);
  });
  test('true to be true', () => {
    const result = myFunc(null);
    expect(result).toBe(false);
  });
  test('true to be true', () => {
    const result = myFunc(['Not logged in']);
    expect(result).toBe(true);
  });
});
