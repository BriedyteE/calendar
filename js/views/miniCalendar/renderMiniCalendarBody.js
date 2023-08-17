import { getDateData } from "../../utils/dateTime.js";
import { createMonthCalendarBody } from "../../elements/index.js";
import { MINI_CALENDAR_CONGIF } from "../../config.js";

export const renderMiniCalendarBody = ({
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
    onCellClick,
  });

  miniCalendar.appendChild(calendarBody);
};
