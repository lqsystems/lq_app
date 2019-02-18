export const convertToAmPm = (timeStr) => {
  const splitTimeStr = timeStr.split(':');
  const minutes = splitTimeStr[1];
  let hours = Number(splitTimeStr[0]);

  if (hours === 0) {
    return `12:${minutes} am`;
  }

  if (hours === 12) {
    return `${hours}:${minutes} pm`;
  }

  if (hours > 12) {
    hours -= 12;
    return `${hours}:${minutes} pm`;
  }

  return `${hours}:${minutes} am`;
};
