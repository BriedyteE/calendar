import { createLoadingSpinner } from "../elements/index.js";
import { saveEventToLocalStorage } from "../services.js";
import { addEventSlot, closeEventModal } from "./index.js";

export const saveEvent = async (event) => {
  const modal = document.querySelector(".event-modal");
  const spinner = createLoadingSpinner();

  try {
    modal.appendChild(spinner);
    const newEvent = await saveEventToLocalStorage(event);

    modal.removeChild(spinner);
    addEventSlot({ event: newEvent, isModalOpen: true });
    closeEventModal({ isEventSaved: true });
  } catch (e) {
    modal.removeChild(spinner);
    console.log("Error when saving event");
  }
};
