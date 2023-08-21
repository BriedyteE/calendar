import { updateEventFromLocalStorage } from "../services.js";
import { displayModalLoader } from "../views/index.js";

export let fetchedEvents;

export const updateEvent = async ({
  updatedEvent,
  savedDate,
  onSuccess,
  onError,
}) => {
  displayModalLoader(true);

  try {
    const newEvent = await updateEventFromLocalStorage({
      updatedEvent,
      savedDate,
    });
    onSuccess(newEvent);

    displayModalLoader(false);
  } catch (e) {
    onError(e);
    displayModalLoader(false);
  }
};

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
