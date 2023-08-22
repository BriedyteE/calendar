import { getDateData } from "../../utils/dateTime.js";
import { createMonthCalendarBody } from "../../elements/index.js";
import { MINI_CALENDAR_CONGIF } from "../../config.js";
import { getFirstDateOfMiniCal, getSelectedDate } from "../../state.js";
import { navigateToSelectedDate } from "../../handlers/handleNavigation.js";
import { displayMiniCalDate } from "../index.js";

export const renderMiniCalendarsBody = () => {
  document.querySelector(".mini-calendar .body")?.remove();

  const miniCalendar = document.querySelector(".mini-calendar");
  const selectedDate = getDateData(getSelectedDate());
  const monthStartDate = getFirstDateOfMiniCal();

  const current = getDateData(new Date());

  const calendarBody = createMonthCalendarBody({
    monthStartDate,
    formattedCurrentDate: current.formattedDate,
    formattedSelectedDate: selectedDate.formattedDate,
    weekDaysCount: MINI_CALENDAR_CONGIF.weekDaysCount,
    rowsCount: MINI_CALENDAR_CONGIF.bodyRowsCount,
    onCellClick: (_e, date) => navigateToSelectedDate(date),
  });

  miniCalendar.appendChild(calendarBody);

  displayMiniCalDate(monthStartDate);
};
