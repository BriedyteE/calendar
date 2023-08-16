import { addEventSlot } from "../handlers/index.js";

export const displayEvents = (fetchedEvents, calendarMode) => {
  if (fetchedEvents) {
    document.querySelectorAll(".main-calendar time").forEach((timeCell) => {
      const dayEvents = fetchedEvents[timeCell.getAttribute("datetime")];

      dayEvents?.forEach((event) => {
        addEventSlot({
          event,
          isSavedEvent: true,
        });
      });
    });
  }
};
