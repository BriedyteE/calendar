import { closeEventModal } from "./index.js";
import { deleteEventFromLocalStorage } from "../services.js";
import { displayModalLoader } from "../views/index.js";

export const deleteEvent = ({ savedDate, eventId, onSuccess, onError }) => {
  displayModalLoader(true);

  async function deleteEvent() {
    try {
      await deleteEventFromLocalStorage(savedDate, eventId);
      displayModalLoader(false);
      onSuccess();
    } catch (error) {
      displayModalLoader(false);
      onError(error);
    }
  }

  deleteEvent();
};
