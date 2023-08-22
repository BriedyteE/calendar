import { getEventTimeFromCellClick } from "../utils/dateTime.js";
import { addEventSlot, displayEventModal } from "../views/index.js";
import { isWeekCalendarMode } from "../utils/calendars.js";

export const onMainCalendarCellClick = (e, date, cellIndex) => {
  if (e.target === e.currentTarget) {
    const isWeekCalendar = isWeekCalendarMode();

    const { startTime, endTime } = isWeekCalendar
      ? getEventTimeFromCellClick(e, cellIndex)
      : { startTime: "00:00", endTime: "00:30" };

    const event = { date, startTime, endTime };

    addEventSlot({ event, isModalOpen: true });
    displayEventModal(event);
  }
};
