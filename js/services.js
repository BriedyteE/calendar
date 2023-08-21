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
      const events = JSON.parse(localStorage.getItem("events"));

      const filteredEvents =
        events[date]?.filter((event) => event.id !== id) || [];

      if (filteredEvents.length) {
        events[date] = filteredEvents;
      } else {
        delete events[date];
      }

      localStorage.setItem("events", JSON.stringify(events));
      resolve();
    }, 1000);
  });
}

export function updateEventFromLocalStorage({ updatedEvent, savedDate }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("events"));

      const filteredEvents = events[savedDate].filter(
        (savedEvent) => savedEvent.id !== updatedEvent.id
      );

      if (filteredEvents.length) {
        events[savedDate] = filteredEvents;
      } else {
        delete events[savedDate];
      }

      const eventsOfNewDate = events[updatedEvent.date] || [];
      eventsOfNewDate[eventsOfNewDate.length] = updatedEvent;
      events[updatedEvent.date] = eventsOfNewDate;

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
