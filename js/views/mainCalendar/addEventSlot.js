import {
  calculateEventDuration,
  convertInputTimeToSeconds,
} from "../../utils/dateTime.js";
import { createEventSlot } from "../../elements/eventSlot.js";
import { MAIN_CALENDAR_MODES } from "../../constants.js";

export const addEventSlot = ({
  event,
  isModalOpen = false,
  calendarMode,
  onClick,
}) => {
  document.querySelector(".event.open")?.remove();

  const mainCalendar = document.querySelector(".main-calendar");
  const isWeekCalendar = calendarMode === MAIN_CALENDAR_MODES.Week;
  const { date, startTime, endTime, title } = event;

  const [startHour, startSeconds] = startTime.split(":");
  const eventDurationInSeconds = calculateEventDuration(startTime, endTime);

  const eventSlot = createEventSlot({
    onClick: () => onClick(event),
    isModalOpen,
    title: title ? `${title}  (${startTime})` : `No title (${startTime})`,
    height: isWeekCalendar ? `${(eventDurationInSeconds * 100) / 60}%` : null,
    topPossition: isWeekCalendar
      ? `${(Number(startSeconds) * 100) / 60}%`
      : null,
    startTime: convertInputTimeToSeconds(startTime),
  });

  if (isWeekCalendar) {
    const columnOfTheDate = mainCalendar
      .querySelector(`.main-calendar time[datetime="${date}"]`)
      .closest(".column");
    const cellsOfTheDate = columnOfTheDate.querySelectorAll(".cell");
    const cell = cellsOfTheDate[Number(startHour) + 1];

    cell.appendChild(eventSlot);

    if (isModalOpen) {
      eventSlot.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    const cellOfTheDate = mainCalendar
      .querySelector(`.main-calendar time[datetime="${date}"]`)
      .closest(".cell");
    const eventsInCell = [...cellOfTheDate.querySelectorAll(".event")];
    const nextEventSlot = eventsInCell.find(
      (slot) =>
        Number(slot.dataset.starttime) >= Number(eventSlot.dataset.starttime)
    );

    if (nextEventSlot) {
      cellOfTheDate.insertBefore(eventSlot, nextEventSlot);
    } else {
      cellOfTheDate.appendChild(eventSlot);
    }
  }
};
