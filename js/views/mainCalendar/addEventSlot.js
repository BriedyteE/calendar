import {
  calculateEventDuration,
  convertInputTimeToSeconds,
} from "../../utils/dateTime.js";
import { isWeekCalendarMode } from "../../utils/calendars.js";
import { createEventSlot } from "../../elements/index.js";
import { displayEventModal } from "../../views/index.js";

export const addEventSlot = ({ event, isModalOpen = false }) => {
  document.querySelector(".event.open")?.remove();
  const mainCalendar = document.querySelector(".main-calendar");
  const isWeekCalendar = isWeekCalendarMode();

  const { date, startTime, endTime, title } = event;

  const [startHour, startSeconds] = startTime.split(":");
  const eventDurationInSeconds = calculateEventDuration(startTime, endTime);

  const eventSlot = createEventSlot({
    onClick: () => displayEventModal(event),
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
