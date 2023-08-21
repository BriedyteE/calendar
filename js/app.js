"use strict";

import { MAIN_CALENDAR_MODES } from "./constants.js";
import { MAIN_CALENDAR_CONFIG, MINI_CALENDAR_CONGIF } from "./config.js";

import { getEventTimeFromCellClick, getDateData } from "./utils/dateTime.js";

import {
  getCellByDate,
  fetchEvents,
  saveEvent,
  updateEvent,
  closeEventModal,
  deleteEvent,
} from "./handlers/index.js";

import {
  createHoursColumn,
  createMonthCalendarHeader,
} from "./elements/index.js";

import {
  renderMainCalendarsBody,
  displayEvents,
  renderMiniCalendarsBody,
  highliteSelectedDayInMiniCal,
  displayEventModal,
  addEventSlot,
  displayTopLoader,
} from "./views/index.js";

const calendarModeSelect = document.querySelector("select.mode-select");
const mainCalendar = document.querySelector(".main-calendar");
const currDate = new Date();

let selectedDate = new Date();
let firstDateOfMiniCal = new Date(
  currDate.getFullYear(),
  currDate.getMonth(),
  1
);
let calendarMode =
  localStorage.getItem("mainCalendarMode") || MAIN_CALENDAR_MODES.Week;
calendarModeSelect.value = calendarMode;

const addSlotAndCloseModal = (event) => {
  addEventSlot({
    event: event,
    isModalOpen: true,
    onClick: onTimeSlotClick,
    calendarMode,
  });

  closeEventModal({ isEventSaved: true });
};

const navigateMiniCalendarByDate = (formattedDate) => {
  const cellOfSelectedDay = getCellByDate("mini-calendar", formattedDate);

  if (cellOfSelectedDay) {
    highliteSelectedDayInMiniCal(cellOfSelectedDay);
  } else {
    renderMiniCalendarsBody({
      monthStartDate: firstDateOfMiniCal,
      selectedDate,
      onCellClick: navigateToSelectedDate,
    });
  }
};

const navigateMainCalendarByDate = (formattedDate) => {
  const selectors = {
    [MAIN_CALENDAR_MODES.Week]: `.main-calendar time[datetime="${formattedDate}"]`,
    [MAIN_CALENDAR_MODES.Month]: `.main-calendar .current-month time[datetime="${formattedDate}"]`,
  };
  const selectedDayInMainCal = document.querySelector(selectors[calendarMode]);

  if (!selectedDayInMainCal) {
    renderMainCalendarsBody({
      calendarMode,
      selectedDate,
      onCellClick: onMainCalendarCellClick,
    });
    displayEvents({ onTimeSlotClick, calendarMode });
  }
};

const navigateToSelectedDate = (formattedDate) => {
  selectedDate = new Date(formattedDate);
  firstDateOfMiniCal = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  navigateMiniCalendarByDate(formattedDate);
  navigateMainCalendarByDate(formattedDate);
};

const onDateTimeChange = (event) => {
  navigateToSelectedDate(event.date);
  addEventSlot({
    event,
    isModalOpen: true,
    onClick: onTimeSlotClick,
    calendarMode,
  });
};

const onSubmit = (event, savedDate) => {
  if (event.id) {
    updateEvent({
      updatedEvent: event,
      savedDate: savedDate,
      onSuccess: addSlotAndCloseModal,
      onError: (e) => console.log(e),
    });
  } else {
    saveEvent({
      event,
      onSuccess: addSlotAndCloseModal,
      onError: (e) => console.log(e),
    });
  }
};

const onDeleteClick = (savedDate, eventId) => {
  deleteEvent({
    savedDate,
    eventId,
    onSuccess: () => closeEventModal({ isEventSaved: false }),
    onError: (e) => console.log(e),
  });
};

const onTimeSlotClick = (event) => {
  displayEventModal({
    event,
    onClose: closeEventModal,
    onDateTimeChange,
    onSubmit,
    onDelete: onDeleteClick,
  });
};

const onEventsLoadSuccess = () => {
  displayTopLoader(false);
  displayEvents({ onTimeSlotClick, calendarMode });
};

const onMainCalendarCellClick = (e, date, cellIndex) => {
  if (e.target === e.currentTarget) {
    const isWeekCalendar = calendarMode === MAIN_CALENDAR_MODES.Week;

    const { startTime, endTime } = isWeekCalendar
      ? getEventTimeFromCellClick(e, cellIndex)
      : { startTime: "00:00", endTime: "00:30" };

    const event = { date, startTime, endTime };

    addEventSlot({
      event,
      isModalOpen: true,
      onClick: onTimeSlotClick,
      calendarMode,
    });

    displayEventModal({
      event,
      onDateTimeChange,
      onSubmit,
      onClose: closeEventModal,
      onDelete: onDeleteClick,
    });
  }
};

document.querySelector(".today-btn").addEventListener("click", () => {
  const { formattedDate } = getDateData(currDate);
  navigateToSelectedDate(formattedDate);
});

document.querySelectorAll(".mini.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const month = firstDateOfMiniCal.getMonth();
    firstDateOfMiniCal.setMonth(index === 0 ? month - 1 : month + 1);

    renderMiniCalendarsBody({
      monthStartDate: firstDateOfMiniCal,
      selectedDate,
      onCellClick: navigateToSelectedDate,
    });
  });
});

document.querySelectorAll(".main.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const day = selectedDate.getDate();

    if (calendarMode === MAIN_CALENDAR_MODES.Week) {
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
  const currMode = calendarMode;
  calendarMode = e.target.value;
  localStorage.setItem("mainCalendarMode", calendarModeSelect.value);
  calendarModeSelect.value = e.target.value;

  mainCalendar.classList.replace(currMode, calendarMode);
  renderMainCalendar({
    calendarMode: calendarModeSelect.value,
    selectedDate,
    setSelectedDate: navigateToSelectedDate,
  });

  displayEvents({ onTimeSlotClick, calendarMode });
});

const renderMainCalendar = () => {
  mainCalendar.classList.add(calendarMode);
  mainCalendar.innerHTML = "";

  if (calendarMode === MAIN_CALENDAR_MODES.Week) {
    const hoursColumn = createHoursColumn(MAIN_CALENDAR_CONFIG.week.hoursCount);
    mainCalendar.appendChild(hoursColumn);
  } else {
    const header = createMonthCalendarHeader(
      MAIN_CALENDAR_CONFIG.month.weekDaysCount
    );
    mainCalendar.appendChild(header);
  }

  renderMainCalendarsBody({
    calendarMode,
    selectedDate,
    onCellClick: onMainCalendarCellClick,
  });
};

export const renderMiniCalendar = () => {
  const miniCalendar = document.querySelector(".mini-calendar");

  const header = createMonthCalendarHeader(MINI_CALENDAR_CONGIF.weekDaysCount);
  miniCalendar.appendChild(header);

  renderMiniCalendarsBody({
    monthStartDate: firstDateOfMiniCal,
    selectedDate,
    onCellClick: navigateToSelectedDate,
  });
};

renderMiniCalendar();
renderMainCalendar();

fetchEvents({
  onFetchStart: () => displayTopLoader(true),
  onSuccess: onEventsLoadSuccess,
  onError: (e) => console.log(e),
});
