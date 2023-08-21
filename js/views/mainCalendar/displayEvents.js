import { addEventSlot } from "../../handlers/index.js";

import { getFetchedEvents } from "../../handlers/handleEvents.js";

export const displayEvents = ({ onTimeSlotClick, calendarMode }) => {
  const fetchedEvents = getFetchedEvents();
  if (fetchedEvents) {
    document.querySelectorAll(".main-calendar time").forEach((timeCell) => {
      const dayEvents = fetchedEvents[timeCell.getAttribute("datetime")];

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
