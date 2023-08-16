const convertInputTimeToSeconds = (time) => {
  const [hour, seconds] = time.split(":");
  return Number(hour) * 60 + Number(seconds);
};

export const calculateEventDurationFromInputs = (startTime, endTime) =>
  convertInputTimeToSeconds(endTime) - convertInputTimeToSeconds(startTime);

export const getDateData = (date) => {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const formattedDate = [
    year,
    month + 1 > 9 ? month + 1 : `0${month + 1}`,
    dayOfMonth > 9 ? dayOfMonth : `0${dayOfMonth}`,
  ].join("-");

  return {
    dayOfWeek: dayOfWeek === 0 ? 7 : dayOfWeek,
    dayOfMonth,
    month,
    year,
    formattedDate,
    date,
  };
};

export const getFirstDateOfWeek = (date) => {
  const { year, month, dayOfMonth, dayOfWeek } = getDateData(date);

  return new Date(year, month, dayOfMonth - dayOfWeek + 1);
};