import { createLoadingSpinner } from "../elements/index.js";
import { closeEventModal } from "./index.js";
import { deleteEventFromLocalStorage } from "../services.js";

export const deleteEvent = (date, eventId) => {
  const modal = document.querySelector(".event-modal");
  const spinner = createLoadingSpinner();

  async function deleteEvent() {
    try {
      await deleteEventFromLocalStorage(date, eventId);
      modal.removeChild(spinner);
      closeEventModal({ isEventSaved: false });
    } catch (error) {
      modal.removeChild(spinner);
      console.log(error);
    }
  }

  modal.appendChild(spinner);
  deleteEvent();
};
