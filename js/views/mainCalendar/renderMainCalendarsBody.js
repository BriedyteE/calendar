import { MAIN_CALENDAR_MODES } from "../../constants.js";
import { MAIN_CALENDAR_CONFIG } from "../../config.js";
import { getMainCalendarMode, getSelectedDate } from "../../state.js";

import {
  createWeekCalendarHeaderAndBody,
  createMonthCalendarBody,
} from "../../elements/index.js";

import { displayMainCalDate } from "../index.js";

import { getDateData, getFirstDateOfWeek } from "../../utils/dateTime.js";
import { onMainCalendarCellClick } from "../../handlers/index.js";

export const renderMainCalendarsBody = () => {
  document.querySelector(".main-calendar .body")?.remove();

  const mainCalendar = document.querySelector(".main-calendar");
  const calendarMode = getMainCalendarMode();
  const selectedDate = getSelectedDate();
  const currDate = getDateData(new Date());

  if (calendarMode === MAIN_CALENDAR_MODES.Week) {
    const firstDateOfWeek = getFirstDateOfWeek(selectedDate);
    const body = createWeekCalendarHeaderAndBody({
      daysCount: MAIN_CALENDAR_CONFIG.week.weekDaysCount,
      hoursCount: MAIN_CALENDAR_CONFIG.week.hoursCount,
      firstDateOfWeek,
      onCellClick: onMainCalendarCellClick,
      formattedCurrentDate: currDate.formattedDate,
    });
    mainCalendar.appendChild(body);
    displayMainCalDate(firstDateOfWeek, calendarMode);
  } else {
    const selected = getDateData(selectedDate);
    const monthStartDate = new Date(selected.year, selected.month, 1);

    const calendarBody = createMonthCalendarBody({
      monthStartDate,
      formattedCurrentDate: currDate.formattedDate,
      formattedSelectedDate: selected.formattedDate,
      weekDaysCount: MAIN_CALENDAR_CONFIG.month.weekDaysCount,
      rowsCount: MAIN_CALENDAR_CONFIG.month.bodyRowsCount,
      onCellClick: onMainCalendarCellClick,
    });

    mainCalendar.appendChild(calendarBody);
    displayMainCalDate(monthStartDate);
  }
};
