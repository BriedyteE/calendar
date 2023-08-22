import { MONTHS } from "../../constants.js";
import { getMainCalendarMode } from "../../state.js";
import { getMonthDateText, getDateData } from "../../utils/dateTime.js";

export const displayMainCalDate = (firstDate) => {
  const dateContainer = document.querySelector(".date.main");
  const isWeekCalendar = getMainCalendarMode();

  if (isWeekCalendar) {
    const {
      year: startYear,
      month: startMonth,
      dayOfMonth,
    } = getDateData(firstDate);
    const { year: endYear, month: endMonth } = getDateData(
      new Date(startYear, startMonth, dayOfMonth + 7)
    );

    const endDate = `${MONTHS[endMonth]} ${endYear} `;

    if (endYear !== startYear) {
      dateContainer.textContent = `${MONTHS[startMonth]} ${startYear} - ${endDate}`;
    } else if (startMonth !== endMonth) {
      dateContainer.textContent = `${MONTHS[startMonth]} - ${endDate}`;
    } else {
      dateContainer.textContent = endDate;
    }
  } else {
    dateContainer.textContent = getMonthDateText(firstDate);
  }
};
