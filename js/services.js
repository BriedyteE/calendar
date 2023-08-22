import {
  addEventToEventsList,
  deleteEventFromEventsList,
  updateEventFromEventsList,
} from "./utils/events.js";

export function getEventsFromLocalStorage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedData = JSON.parse(localStorage.getItem("events") || "{}");
      resolve(savedData);
    }, 1200);
  });
}

export function deleteEventFromLocalStorage(date, id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("events") || "{}");
      const updatedEvents = deleteEventFromEventsList(events, date, id);

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      resolve(true);
    }, 1000);
  });
}

export function updateEventFromLocalStorage({ updatedEvent, savedDate }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("events") || "{}");
      const updatedEvents = updateEventFromEventsList(
        events,
        updatedEvent,
        savedDate
      );

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      resolve(updatedEvent);
    }, 1000);
  });
}

export function saveEventToLocalStorage(event) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("events") || "{}");
      const newEvent = {
        ...event,
        id: crypto.randomUUID(),
      };

      const updatedEvents = addEventToEventsList(events, newEvent);

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      resolve(newEvent);
    }, 1200);
  });
}
