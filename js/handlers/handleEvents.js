import {
  saveEventToLocalStorage,
  updateEventFromLocalStorage,
  deleteEventFromLocalStorage,
  getEventsFromLocalStorage,
} from "../services.js";
import { displayModalLoader } from "../views/index.js";
import {
  addEventToEventsList,
  deleteEventFromEventsList,
  updateEventFromEventsList,
} from "../utils/eventList.js";

let fetchedEvents;

export const fetchEvents = async ({ onFetchStart, onSuccess, onError }) => {
  onFetchStart();
  try {
    const events = await getEventsFromLocalStorage();
    fetchedEvents = events;
    onSuccess(events);
  } catch (error) {
    onError(error);
  }
};

export const saveEvent = async ({ event, onSuccess, onError }) => {
  displayModalLoader(true);
  try {
    const newEvent = await saveEventToLocalStorage(event);
    fetchedEvents = addEventToEventsList(fetchedEvents, newEvent);

    displayModalLoader(false);
    onSuccess(newEvent);
    return newEvent;
  } catch (e) {
    displayModalLoader(false);
    onError(e);
  }
};

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

    const updatedEvents = updateEventFromEventsList(
      fetchedEvents,
      newEvent,
      savedDate
    );
    fetchedEvents = updatedEvents;
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
      fetchedEvents = deleteEventFromEventsList(
        fetchedEvents,
        savedDate,
        eventId
      );
      displayModalLoader(false);
      onSuccess();
    } catch (error) {
      displayModalLoader(false);
      onError(error);
    }
  }

  deleteEvent();
};

export const getFetchedEvents = () => fetchedEvents;
