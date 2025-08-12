export const isDayDisabled = (date) => {
  const month = date.getMonth();
  const day = date.getDay();
  return month === 7 && (day === 0 || day === 6);
};
