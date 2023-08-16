import { getEventsFromLocalStorage } from "../services.js";

export const fetchEvents = async ({ onFetchStart, onSuccess, onError }) => {
  onFetchStart();
  try {
    const events = await getEventsFromLocalStorage();
    onSuccess(events);
  } catch (error) {
    onError(error);
  }
};
