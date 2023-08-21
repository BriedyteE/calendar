import { saveEventToLocalStorage } from "../services.js";
import { displayModalLoader } from "../views/index.js";

export const saveEvent = async ({ event, onSuccess, onError }) => {
  displayModalLoader(true);
  try {
    const newEvent = await saveEventToLocalStorage(event);
    displayModalLoader(false);
    onSuccess(newEvent);
    return newEvent;
  } catch (e) {
    displayModalLoader(false);
    onError(e);
  }
};
