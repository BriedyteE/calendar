import { renderMainCalendarBody, displayEvents } from "../views/index.js";

export const navigateMainCal = (formattedSelectedDate) => {
  const selectedDayInMainCal = document.querySelector(
    `.main-calendar time[datetime="${formattedSelectedDate}"]`
  );

  if (!selectedDayInMainCal) {
    renderMainCalendarBody({
      calendarMode: "week",
      selectedDate: new Date(formattedSelectedDate),
    });
    displayEvents();
  }
};
