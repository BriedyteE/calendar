import { addEventSlot, displayEventModal } from "../index.js";
import { getMainCalendarMode, getFetchedEvents } from "../../state.js";

export const displayEvents = () => {
  const fetchedEvents = getFetchedEvents();
  const calendarMode = getMainCalendarMode();
  if (fetchedEvents) {
    document.querySelectorAll(".main-calendar time").forEach((timeCell) => {
      const dayEvents = fetchedEvents[timeCell.getAttribute("datetime")];

      dayEvents?.forEach((event) => {
        addEventSlot({
          event,
          isSavedEvent: true,
          calendarMode,
          onClick: () => displayEventModal(event),
        });
      });
    });
  }
};
