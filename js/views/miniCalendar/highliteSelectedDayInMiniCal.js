export const highliteSelectedDayInMiniCal = (selectedDate) => {
  const className = "selected-day";
  document
    .querySelector(`.mini-calendar .${className}`)
    ?.classList.remove(className);

  selectedDate.classList.add(className);
};
