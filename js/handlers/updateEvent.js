import { createLoadingSpinner } from "../elements/index.js";
import { updateEventFromLocalStorage } from "../services.js";
import { closeEventModal, addEventSlot } from "./index.js";

export const updateEvent = async ({ updatedEvent, savedEventDate }) => {
  const modal = document.querySelector(".event-modal");
  const spinner = createLoadingSpinner();

  try {
    modal.appendChild(spinner);
    const newEvent = await updateEventFromLocalStorage({
      updatedEvent,
      savedEventDate,
    });

    modal.removeChild(spinner);
    addEventSlot({ event: newEvent, isModalOpen: true });
    closeEventModal({ isEventSaved: true });
  } catch (e) {
    modal.removeChild(spinner);
    console.log("Error when saving event");
  }
};
