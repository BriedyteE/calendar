import { MAIN_CALENDAR_MODES } from "./constants.js";

import { fetchEvents, navigateMainCal } from "./handlers/index.js";
import {
  getDateData,
  changeDateByWeek,
  changeDateByMonth,
} from "./utils/dateTime.js";

import {
  renderMiniCalendar,
  renderMainCalendar,
  displayTopLoader,
  displayEvents,
  renderMiniCalendarBody,
  highliteSelectedDayInMiniCal,
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

const navigateToSelectedDate = (date) => {
  const { year, month, formattedDate } = getDateData(date);
  selectedDate = date;
  miniCalendarMonthStart = new Date(year, month, 1);
  const cellOfSelectedDay = document
    .querySelector(
      `.mini-calendar .current-month time[datetime="${formattedDate}"]`
    )
    ?.closest(".cell");

  if (cellOfSelectedDay) {
    highliteSelectedDayInMiniCal(cellOfSelectedDay);
  } else {
    renderMiniCalendarBody({
      monthStartDate: miniCalendarMonthStart,
      selectedDate,
      onCellClick: (_e, date) => navigateToSelectedDate(date),
    });
  }

  navigateMainCal(formattedDate);
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
    changeDateByWeek({
      date: selectedDate,
      isBack: index === 0,
    });
    navigateToSelectedDate(selectedDate);
  });
});

document.querySelectorAll(".mini.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    changeDateByMonth({ date: miniCalendarMonthStart, isBack: index === 0 });
    renderMiniCalendarBody({
      monthStartDate: miniCalendarMonthStart,
      selectedDate,
      onCellClick: (_e, date) => navigateToSelectedDate(date),
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
  onCellClick: (_e, date) => navigateToSelectedDate(date),
});

fetchEvents({
  onFetchStart: onEventFetchStart,
  onSuccess: (events) => onEventsLoadSuccess(events),
  onError: (e) => console.log(e),
});
