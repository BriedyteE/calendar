import { MAIN_CALENDAR_MODES, MONTHS } from "../../constants.js";
import { getMonthDateText, getDateData } from "../../utils/dateTime.js";

export const displayMainCalDate = (firstDate, calendatMode) => {
  const dateContainer = document.querySelector(".date.main");

  if (calendatMode === MAIN_CALENDAR_MODES.Week) {
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
