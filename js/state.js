let fetchedEvents = {};
let selectedDate;
let firstDateOfMiniCal;
let mainCalendarMode = "week";

export const getFetchedEvents = () => fetchedEvents;
export const setFetchedEvents = (events) => (fetchedEvents = events);

export const getSelectedDate = () => selectedDate;
export const setSelectedDate = (date) => (selectedDate = date);

export const getFirstDateOfMiniCal = () => firstDateOfMiniCal;
export const setFirstDateOfMiniCal = (date) => (firstDateOfMiniCal = date);

export const getMainCalendarMode = () => mainCalendarMode;
export const setMainCalendarMode = (calendarMode) =>
  (mainCalendarMode = calendarMode);
