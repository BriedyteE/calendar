export const navigateMiniCalByMonth = (currMiniCalendarDate) => {
  const month = currMiniCalendarDate.getMonth();
  miniCalMonthStartDate.setMonth(index === 0 ? month - 1 : month + 1);
  renderMiniCalendarBody();
  displayEvents();
};
