import { createMonthCalendarHeader } from "../../elements/index.js";

import { MINI_CALENDAR_CONGIF } from "../../config.js";
import { renderMiniCalendarBody } from "./renderMiniCalendarBody.js";

export const renderMiniCalendar = (calendarDates) => {
  const miniCalendar = document.querySelector(".mini-calendar");

  const header = createMonthCalendarHeader(MINI_CALENDAR_CONGIF.weekDaysCount);
  miniCalendar.appendChild(header);

  renderMiniCalendarBody(calendarDates);
};
