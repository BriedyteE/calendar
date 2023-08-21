import { getMonthDateText } from "../../utils/dateTime.js";

export const displayMiniCalDate = (date) => {
  const dateContainer = document.querySelector(".date.mini");
  const text = getMonthDateText(date);

  dateContainer.textContent = text;
};
