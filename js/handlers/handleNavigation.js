import { MAIN_CALENDAR_MODES } from "../constants.js";
import {
  getFirstDateOfMiniCal,
  getMainCalendarMode,
  getSelectedDate,
  setFirstDateOfMiniCal,
  setSelectedDate,
} from "../state.js";
import { getMonthCellByDate } from "../utils/calendars.js";
import {
  displayEvents,
  highliteSelectedDayInMiniCal,
  renderMainCalendarsBody,
  renderMiniCalendarsBody,
} from "../views/index.js";

const navigateMiniCalendarByDate = (formattedDate) => {
  const cellOfSelectedDay = getMonthCellByDate("mini-calendar", formattedDate);

  if (cellOfSelectedDay) {
    highliteSelectedDayInMiniCal(cellOfSelectedDay);
  } else {
    renderMiniCalendarsBody();
  }
};

const navigateMainCalendarByDate = (formattedDate) => {
  const calendarMode = getMainCalendarMode();
  const selectors = {
    [MAIN_CALENDAR_MODES.Week]: `.main-calendar time[datetime="${formattedDate}"]`,
    [MAIN_CALENDAR_MODES.Month]: `.main-calendar .current-month time[datetime="${formattedDate}"]`,
  };
  const selectedDayElement = document.querySelector(selectors[calendarMode]);

  if (!selectedDayElement) {
    renderMainCalendarsBody();
    displayEvents();
  }
};

export const navigateToSelectedDate = (formattedDate) => {
  const [year, month, _day] = formattedDate.split("-");

  setSelectedDate(new Date(formattedDate));
  setFirstDateOfMiniCal(new Date(year, Number(month) - 1, 1));

  navigateMiniCalendarByDate(formattedDate);
  navigateMainCalendarByDate(formattedDate);
};
