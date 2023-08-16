import { getDateData } from "../utils/dateTime.js";

import {
  renderMiniCalendarBody,
  renderMainCalendarBody,
  displayEvents,
} from "../views/index.js";

export const navigateToSelectedDate = (selectedDate) => {
  const { year, month, formattedDate } = getDateData(selectedDate);

  const selectedDayInMainCal = document.querySelector(
    `.main-calendar time[datetime="${formattedDate}"]`
  );

  const selectedDayInMiniCal = document.querySelector(
    `.mini-calendar .current-month time[datetime="${formattedDate}"]`
  );

  if (!selectedDayInMainCal) {
    renderMainCalendarBody({
      calendarMode: "week",
      selectedDate: new Date(selectedDate),
    });
    displayEvents();
  }

  if (!selectedDayInMiniCal) {
    renderMiniCalendarBody({
      monthStartDate: new Date(year, month, 1),
      selectedDate: new Date(selectedDate),
    });
  } else {
    const className = "selected-day";
    document
      .querySelector(`.mini-calendar .${className}`)
      ?.classList.remove(className);

    selectedDayInMiniCal.closest(".cell").classList.add(className);
  }
};
