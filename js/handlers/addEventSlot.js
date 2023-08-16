import { openEventModal } from "./openEventModal.js";
import { calculateEventDurationFromInputs } from "../utils/dateTime.js";
import { createEventSlot } from "../elements/eventSlot.js";

export const addEventSlot = ({
  event: { date, startTime, endTime, title, id = null },
  isModalOpen = false,
  calendarMode = "week",
}) => {
  document.querySelector(".event.open")?.remove();

  const mainCalendar = document.querySelector(".main-calendar");
  const [startHour, startSeconds] = startTime.split(":");
  const eventDurationInSeconds = calculateEventDurationFromInputs(
    startTime,
    endTime
  );

  const onClick = () => {
    openEventModal({
      date,
      startTime,
      endTime,
      title,
      eventId: id,
    });
  };

  if (calendarMode === "week") {
    const eventSlot = createEventSlot({
      height: `${(eventDurationInSeconds * 100) / 60}%`,
      topPossition: `${(Number(startSeconds) * 100) / 60}%`,
      onClick,
      isModalOpen,
      title: title ? `${title} ${startTime}` : `(No title) ${startTime}`,
    });

    console.log(date);
    const columnOfTheDate = mainCalendar
      .querySelector(`.main-calendar time[datetime="${date}"]`)
      .closest(".column");
    const cellsOfTheDate = columnOfTheDate.querySelectorAll(".cell");
    const cell = cellsOfTheDate[Number(startHour) + 1];

    cell.appendChild(eventSlot);
  }
};
