import { MAIN_CALENDAR_MODES } from "../constants.js";
import { MAIN_CALENDAR_CONFIG } from "../config.js";

import {
  createHoursColumn,
  createWeekCalendarHeaderAndBody,
  createMonthCalendarHeader,
  createMonthCalendarBody,
} from "../elements/index.js";
import {
  getEventRangeFromCellIndex,
  getDateData,
  getFirstDateOfWeek,
} from "../utils/dateTime.js";
import { openEventModal, addEventSlot } from "../handlers/index.js";

export const renderMainCalendarBody = ({ calendarMode, selectedDate }) => {
  document.querySelector(".main-calendar .body")?.remove();

  const mainCalendar = document.querySelector(".main-calendar");
  const currDate = getDateData(new Date());

  const onCellClick = (e, date, cellIndex) => {
    if (e.target === e.currentTarget) {
      const { startTime, endTime } = getEventRangeFromCellIndex({
        isAtHourStart: e.offsetY < e.target.offsetHeight / 2,
        cellIndex,
      });

      const event = { date, startTime, endTime };

      openEventModal(event);
      addEventSlot({ event, isModalOpen: true });
    }
  };

  if (calendarMode === MAIN_CALENDAR_MODES.Week) {
    const firstDateOfWeek = getFirstDateOfWeek(selectedDate);

    const body = createWeekCalendarHeaderAndBody({
      daysCount: MAIN_CALENDAR_CONFIG.week.weekDaysCount,
      hoursCount: MAIN_CALENDAR_CONFIG.week.hoursCount,
      firstDateOfWeek,
      onCellClick,
      formattedCurrentDate: currDate.formattedDate,
    });

    mainCalendar.appendChild(body);
  } else {
    const selected = getDateData(selectedDate);
    const monthStartDate = new Date(selected.year, selected.month, 1);

    const calendarBody = createMonthCalendarBody({
      monthStartDate,
      formattedCurrentDate: currDate.formattedDate,
      formattedSelectedDate: selected.formattedDate,
      weekDaysCount: MAIN_CALENDAR_CONFIG.month.weekDaysCount,
      rowsCount: MAIN_CALENDAR_CONFIG.month.bodyRowsCount,
      onCellClick,
    });

    mainCalendar.appendChild(calendarBody);
  }
};

export const renderMainCalendar = ({ calendarMode, selectedDate }) => {
  const mainCalendar = document.querySelector(".main-calendar");
  mainCalendar.innerHTML = "";

  if (calendarMode === MAIN_CALENDAR_MODES.Week) {
    mainCalendar.classList.replace("month", "week");
    const hoursColumn = createHoursColumn(MAIN_CALENDAR_CONFIG.week.hoursCount);
    mainCalendar.appendChild(hoursColumn);
  } else {
    mainCalendar.classList.replace("week", "month");
    const header = createMonthCalendarHeader(
      MAIN_CALENDAR_CONFIG.month.weekDaysCount
    );
    mainCalendar.appendChild(header);
  }

  renderMainCalendarBody({ calendarMode, selectedDate });
};
