import { MAIN_CALENDAR_MODES } from "../constants.js";
import { MAIN_CALENDAR_CONFIG } from "../config.js";

import {
  createHoursColumn,
  createWeekCalendarHeaderAndBody,
  createMonthCalendarHeader,
  createMonthCalendarBody,
} from "../elements/index.js";
import { getDateData, getFirstDateOfWeek } from "../utils/dateTime.js";
import { openEventModal, addEventSlot } from "../handlers/index.js";

export const renderMainCalendarBody = ({ calendarMode, selectedDate }) => {
  document.querySelector(".main-calendar .body")?.remove();

  const mainCalendar = document.querySelector(".main-calendar");
  const currDate = getDateData(new Date());

  const onCellClick = (e, date, cellIndex) => {
    if (e.target === e.currentTarget) {
      const isStartOfHour = e.offsetY < e.currentTarget.offsetHeight / 2;

      const cellHour = cellIndex - 1 <= 9 ? `0${cellIndex - 1}` : cellIndex - 1;
      const nextCellHour = cellIndex - 1 < 9 ? `0${cellIndex}` : cellIndex;

      const event = {
        date,
        startTime: `${cellHour}:${isStartOfHour ? "00" : "30"}`,
        endTime: isStartOfHour ? `${cellHour}:30` : `${nextCellHour}:00`,
      };

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
