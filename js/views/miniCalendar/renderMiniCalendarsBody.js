import { getDateData } from "../../utils/dateTime.js";
import { createMonthCalendarBody } from "../../elements/index.js";
import { MINI_CALENDAR_CONGIF } from "../../config.js";
import { displayMiniCalDate } from "./displayMiniCalDate.js";

export const renderMiniCalendarsBody = ({
  monthStartDate,
  selectedDate,
  onCellClick,
}) => {
  document.querySelector(".mini-calendar .body")?.remove();

  const miniCalendar = document.querySelector(".mini-calendar");
  const selected = getDateData(selectedDate);
  const current = getDateData(new Date());

  const calendarBody = createMonthCalendarBody({
    monthStartDate,
    formattedCurrentDate: current.formattedDate,
    formattedSelectedDate: selected.formattedDate,
    weekDaysCount: MINI_CALENDAR_CONGIF.weekDaysCount,
    rowsCount: MINI_CALENDAR_CONGIF.bodyRowsCount,
    onCellClick: (_e, date) => onCellClick(date),
  });

  miniCalendar.appendChild(calendarBody);

  displayMiniCalDate(monthStartDate);
};
