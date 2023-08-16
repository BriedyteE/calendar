import { navigateToSelectedDate } from "./index.js";

export const handleMainNavigation = ({ selectedDate, isBack }) => {
  const day = selectedDate.getDate();
  selectedDate.setDate(isBack ? day - 7 : day + 7);

  navigateToSelectedDate(selectedDate);
};
