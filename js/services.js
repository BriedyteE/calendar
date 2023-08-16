export function getEventsFromLocalStorage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedData = JSON.parse(localStorage.getItem("events"));
      resolve(savedData);
    }, 1200);
  });
}

export function deleteEventFromLocalStorage(date, id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("events")) || {};

      const withoutSelected =
        events[date]?.filter((event) => event.id !== id) || [];

      if (!withoutSelected.length) {
        delete events[date];
      } else {
        events[date] = withoutSelected;
      }

      localStorage.setItem("events", JSON.stringify(events));
      resolve();
    }, 1000);
  });
}

export function updateEventFromLocalStorage({ updatedEvent, savedEventDate }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("events"));

      const filteredEvents = events[savedEventDate].filter(
        (savedEvent) => savedEvent.id !== updatedEvent.id
      );

      if (updatedEvent.date !== savedEventDate) {
        const eventsOfNewDate = events[updatedEvent.date] || [];
        eventsOfNewDate[eventsOfNewDate.length] = updatedEvent;
        events[updatedEvent.date] = eventsOfNewDate;
      } else {
        filteredEvents[filteredEvents.length] = updatedEvent;
      }

      events[savedEventDate] = filteredEvents;

      localStorage.setItem("events", JSON.stringify(events));
      resolve(updatedEvent);
    }, 1000);
  });
}

export function saveEventToLocalStorage(event) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("events")) || {};
      const eventsOfSelectedDate = events[event.date] || [];
      const newEvent = { ...event, id: crypto.randomUUID() };

      eventsOfSelectedDate[eventsOfSelectedDate.length] = newEvent;
      events[event.date] = eventsOfSelectedDate;

      localStorage.setItem("events", JSON.stringify(events));
      resolve(newEvent);
    }, 1200);
  });
}
