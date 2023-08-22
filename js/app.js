import { MAIN_CALENDAR_MODES } from "./constants.js";
import { MAIN_CALENDAR_CONFIG, MINI_CALENDAR_CONGIF } from "./config.js";

import { getDateData } from "./utils/dateTime.js";

import {
  fetchEvents,
  navigateToSelectedDate,
  onMainCalendarCellClick,
} from "./handlers/index.js";

import {
  createHoursColumn,
  createMonthCalendarHeader,
} from "./elements/index.js";

import {
  renderMainCalendarsBody,
  displayEvents,
  renderMiniCalendarsBody,
  displayTopLoader,
} from "./views/index.js";

import {
  getFirstDateOfMiniCal,
  getMainCalendarMode,
  getSelectedDate,
  setFirstDateOfMiniCal,
  setMainCalendarMode,
  setSelectedDate,
} from "./state.js";
import { isWeekCalendarMode } from "./utils/calendars.js";

const mainCalendar = document.querySelector(".main-calendar");
const calendarModeSelect = document.querySelector("select.mode-select");

const onEventsLoadSuccess = () => {
  displayTopLoader(false);
  displayEvents();
};

document.querySelector(".today-btn").addEventListener("click", () => {
  const { formattedDate } = getDateData(new Date());
  navigateToSelectedDate(formattedDate);
});

document.querySelectorAll(".mini.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const firstDateOfMiniCal = getFirstDateOfMiniCal();
    const month = firstDateOfMiniCal.getMonth();
    const monthToNavigate = index === 0 ? month - 1 : month + 1;

    setFirstDateOfMiniCal(
      new Date(firstDateOfMiniCal.getFullYear(), monthToNavigate, 1)
    );

    renderMiniCalendarsBody({
      onCellClick: navigateToSelectedDate,
    });
  });
});

document.querySelectorAll(".main.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const selectedDate = getSelectedDate();
    const day = selectedDate.getDate();
    const isWeekCalendar = isWeekCalendarMode();

    if (isWeekCalendar) {
      const { formattedDate } = getDateData(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          index === 0 ? day - 7 : day + 7
        )
      );

      navigateToSelectedDate(formattedDate);
    } else {
      const month = selectedDate.getMonth();
      const { formattedDate } = getDateData(
        new Date(
          selectedDate.getFullYear(),
          index === 0 ? month - 1 : month + 1,
          1
        )
      );

      navigateToSelectedDate(formattedDate);
    }
  });
});

calendarModeSelect.addEventListener("change", (e) => {
  const currentMode = getMainCalendarMode();

  setMainCalendarMode(e.target.value);
  localStorage.setItem("mainCalendarMode", e.target.value);
  calendarModeSelect.value = e.target.value;

  mainCalendar.classList.replace(currentMode, e.target.value);
  renderMainCalendar({ onCellClick: onMainCalendarCellClick });

  displayEvents();
});

const initState = () => {
  const calendarMode =
    localStorage.getItem("mainCalendarMode") || MAIN_CALENDAR_MODES.Week;
  mainCalendar.classList.add(calendarMode);

  calendarModeSelect.value = calendarMode;
  const today = new Date();

  setMainCalendarMode(calendarMode);
  setSelectedDate(today);
  setFirstDateOfMiniCal(new Date(today.getFullYear(), today.getMonth(), 1));
};

const renderMainCalendar = () => {
  document.querySelector(".main-calendar").innerHTML = "";
  const calendarMode = getMainCalendarMode();

  if (calendarMode === MAIN_CALENDAR_MODES.Week) {
    const hoursColumn = createHoursColumn(MAIN_CALENDAR_CONFIG.week.hoursCount);
    mainCalendar.appendChild(hoursColumn);
  } else {
    const header = createMonthCalendarHeader(
      MAIN_CALENDAR_CONFIG.month.weekDaysCount
    );
    mainCalendar.appendChild(header);
  }

  renderMainCalendarsBody({ onCellClick: onMainCalendarCellClick });
};

export const renderMiniCalendar = () => {
  const miniCalendar = document.querySelector(".mini-calendar");

  const header = createMonthCalendarHeader(MINI_CALENDAR_CONGIF.weekDaysCount);
  miniCalendar.appendChild(header);

  renderMiniCalendarsBody({
    onCellClick: navigateToSelectedDate,
  });
};

initState();

renderMiniCalendar();
renderMainCalendar();

fetchEvents({
  onFetchStart: () => displayTopLoader(true),
  onSuccess: onEventsLoadSuccess,
  onError: (e) => console.log(e),
});
