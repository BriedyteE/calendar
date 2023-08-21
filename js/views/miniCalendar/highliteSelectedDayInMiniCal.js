export const highliteSelectedDayInMiniCal = (selectedDateCell) => {
  const className = "selected-day";
  document
    .querySelector(`.mini-calendar .${className}`)
    ?.classList.remove(className);

  selectedDateCell.classList.add(className);
};
