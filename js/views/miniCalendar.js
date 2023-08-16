import {
  createMonthCalendarHeader,
  createMonthCalendarBody,
} from "../elements/index.js";
import { getDateData } from "../utils/dateTime.js";
import { navigateToSelectedDate } from "../handlers/index.js";

import { MINI_CALENDAR_CONGIF } from "../config.js";

const miniCalendar = document.querySelector(".mini-calendar");

export const renderMiniCalendarBody = ({ monthStartDate, selectedDate }) => {
  document.querySelector(".mini-calendar .body")?.remove();

  const selected = getDateData(selectedDate);
  const current = getDateData(new Date());

  const calendarBody = createMonthCalendarBody({
    monthStartDate,
    formattedCurrentDate: current.formattedDate,
    formattedSelectedDate: selected.formattedDate,
    weekDaysCount: MINI_CALENDAR_CONGIF.weekDaysCount,
    rowsCount: MINI_CALENDAR_CONGIF.bodyRowsCount,
    onCellClick: (_e, date) => navigateToSelectedDate(date),
  });

  miniCalendar.appendChild(calendarBody);
};

export const renderMiniCalendar = (calendarDates) => {
  const header = createMonthCalendarHeader(MINI_CALENDAR_CONGIF.weekDaysCount);
  miniCalendar.appendChild(header);

  renderMiniCalendarBody(calendarDates);
};
