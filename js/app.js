import { MAIN_CALENDAR_MODES } from "./constants.js";

import {
  fetchEvents,
  navigateMiniCalendar,
  handleMainNavigation,
  navigateToSelectedDate,
} from "./handlers/index.js";

import {
  renderMiniCalendar,
  renderMainCalendar,
  displayTopLoader,
  displayEvents,
} from "./views/index.js";

const calendarModeSelect = document.querySelector("select.mode-select");
const mainCalendar = document.querySelector(".main-calendar");
const calendarMode =
  localStorage.getItem("mainCalendarMode") || MAIN_CALENDAR_MODES.Week;

mainCalendar.classList.add(calendarMode);

const currDate = new Date();
let selectedDate = new Date();
let miniCalendarMonthStart = new Date(
  currDate.getFullYear(),
  currDate.getMonth(),
  1
);

let fetchedEvents;
let areEventsFetching = false;

const onEventFetchStart = () => {
  areEventsFetching = true;
  displayTopLoader(true);
};

const onEventsLoadSuccess = (events) => {
  displayTopLoader(false);
  areEventsFetching = false;
  if (events) {
    fetchedEvents = events;
    displayEvents(events);
  }
};

document.querySelector(".today-btn").addEventListener("click", () => {
  selectedDate = new Date(currDate);
  miniCalendarMonthStart = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    1
  );
  navigateToSelectedDate(selectedDate);
});

document.querySelectorAll(".main.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    handleMainNavigation({
      selectedDate,
      isBack: index === 0,
    });
  });
});

document.querySelectorAll(".mini.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    navigateMiniCalendar({
      monthStartDate: miniCalendarMonthStart,
      selectedDate,
      isBack: index === 0,
    });
  });
});

calendarModeSelect.addEventListener("change", () => {
  localStorage.setItem("mainCalendarMode", calendarModeSelect.value);
  renderMainCalendar({ calendarMode: calendarModeSelect.value, selectedDate });
  displayEvents(fetchedEvents, calendarModeSelect.value);
});

renderMainCalendar({ calendarMode, selectedDate });

renderMiniCalendar({
  monthStartDate: miniCalendarMonthStart,
  selectedDate,
});

fetchEvents({
  onFetchStart: onEventFetchStart,
  onSuccess: (events) => onEventsLoadSuccess(events),
  onError: (e) => console.log(e),
});
