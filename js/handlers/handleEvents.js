import {
  saveEventToLocalStorage,
  updateEventFromLocalStorage,
  deleteEventFromLocalStorage,
  getEventsFromLocalStorage,
} from "../services.js";

import {
  addEventToEventsList,
  deleteEventFromEventsList,
  updateEventFromEventsList,
} from "../utils/events.js";

import { getFetchedEvents, setFetchedEvents } from "../state.js";
import { displayModalLoader } from "../views/index.js";

export const fetchEvents = async ({ onFetchStart, onSuccess, onError }) => {
  onFetchStart();
  try {
    const events = await getEventsFromLocalStorage();
    setFetchedEvents(events);
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const saveEvent = async ({ event, onSuccess, onError }) => {
  displayModalLoader(true);
  try {
    const events = getFetchedEvents();
    const newEvent = await saveEventToLocalStorage(event);
    setFetchedEvents(addEventToEventsList(events, newEvent));

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
    const fetchedEvents = getFetchedEvents();
    const newEvent = await updateEventFromLocalStorage({
      updatedEvent,
      savedDate,
    });

    setFetchedEvents(
      updateEventFromEventsList(fetchedEvents, newEvent, savedDate)
    );

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
      const fetchedEvents = getFetchedEvents();
      setFetchedEvents(
        deleteEventFromEventsList(fetchedEvents, savedDate, eventId)
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
