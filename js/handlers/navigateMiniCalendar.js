import { renderMiniCalendarBody } from "../views/miniCalendar.js";

export const navigateMiniCalendar = ({
  monthStartDate,
  selectedDate,
  isBack,
}) => {
  console.log(monthStartDate, selectedDate);
  const month = monthStartDate.getMonth();
  monthStartDate.setMonth(isBack ? month - 1 : month + 1);
  renderMiniCalendarBody({ monthStartDate, selectedDate });
};
