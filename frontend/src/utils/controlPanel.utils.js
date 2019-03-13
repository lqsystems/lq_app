export const getPercentLabel = (sliderPos) => {
  const label = (sliderPos && sliderPos[0]) ? sliderPos[0] : 0;
  return `${label}%`;
};
