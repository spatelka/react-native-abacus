// import moment from 'moment';

export const getCurrentDate = () => {
  return new Date();
};

export const dateToString = (date) => {
  return date.toLocaleString();
};

export const setDuration = (startDate, endDate) => {
  const duration = endDate - startDate;
  return (duration / 1000).toFixed(0);
};

export const durationToString = (duration) => {
  let durationStr = duration + "s";
  if (duration > 60) {
    const minutes = Math.floor(duration / 60);
    durationStr = minutes + "m " + (duration - minutes * 60) + "s";
  }
  return durationStr;
};
