import { MAIN_CALENDAR_MODES } from "../constants.js";
import { getMainCalendarMode } from "../state.js";

export const getMonthCellByDate = (calendarClass, formattedDate) => {
  return document
    .querySelector(
      `.${calendarClass} .current-month time[datetime="${formattedDate}"]`
    )
    ?.closest(".cell");
};

export const isWeekCalendarMode = () => {
  const calendarMode = getMainCalendarMode();
  return calendarMode === MAIN_CALENDAR_MODES.Week;
};
