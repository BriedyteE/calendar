export const addEventToEventsList = (events, newEvent) => {
  const eventsOfTheDate = events?.[newEvent.date] || [];
  eventsOfTheDate[eventsOfTheDate.length] = newEvent;
  events[newEvent.date] = eventsOfTheDate;

  return events;
};

export const deleteEventFromEventsList = (events, date, id) => {
  const filteredEvents = events[date]?.filter((event) => event.id !== id) || [];

  if (filteredEvents.length) {
    events[date] = filteredEvents;
  } else {
    delete events[date];
  }

  return events;
};

export const updateEventFromEventsList = (events, updatedEvent, savedDate) => {
  deleteEventFromEventsList(events, savedDate, updatedEvent.id);

  return addEventToEventsList(events, updatedEvent);
};
