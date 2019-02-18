const convertToAmPm = (timeStr) => {
  const splitTimeStr = timeStr.split(':');
  const minutes = splitTimeStr[1];
  let hours = Number(splitTimeStr[0]);

  if (hours === 0) {
    return `12:${minutes}am`;
  }

  if (hours === 12) {
    return `${hours}:${minutes}pm`;
  }

  if (hours > 12) {
    hours -= 12;
    return `${hours}:${minutes}pm`;
  }

  return `${hours}:${minutes}am`;
};

describe('time converter', () => {
  it('converts 23:01 to 11:01pm', () => {
    const time = '23:01';
    const expected = '11:01pm';
    const actual = convertToAmPm(time);
    expect(expected).toBe(actual);
  });
  it('converts 0:27 to 12:27am', () => {
    const time = '0:27';
    const expected = '12:27am';
    const actual = convertToAmPm(time);
    expect(expected).toBe(actual);
  });
  it('converts 13 to 1pm', () => {
    const time = '13:00';
    const expected = '1:00pm';
    const actual = convertToAmPm(time);
    expect(expected).toBe(actual);
  });
  it('converts 1:00 to 1:00am', () => {
    const time = '1:00';
    const expected = '1:00am';
    const actual = convertToAmPm(time);
    expect(expected).toBe(actual);
  });
  it('converts 12:00 to 12:00pm', () => {
    const time = '12:00';
    const expected = '12:00pm';
    const actual = convertToAmPm(time);
    expect(expected).toBe(actual);
  });
  it('converts 0:00 to 12:00am', () => {
    const time = '0:00';
    const expected = '12:00am';
    const actual = convertToAmPm(time);
    expect(expected).toBe(actual);
  });
});
