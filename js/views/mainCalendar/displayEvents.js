import { addEventSlot } from "../../handlers/index.js";

export const displayEvents = ({ events, onTimeSlotClick, calendarMode }) => {
  if (events) {
    document.querySelectorAll(".main-calendar time").forEach((timeCell) => {
      const dayEvents = events[timeCell.getAttribute("datetime")];

      dayEvents?.forEach((event) => {
        addEventSlot({
          event,
          isSavedEvent: true,
          calendarMode,
          onClick: onTimeSlotClick,
        });
      });
    });
  }
};
