export const getCellByDate = (calendarClass, formattedDate) => {
  return document
    .querySelector(
      `.${calendarClass} .current-month time[datetime="${formattedDate}"]`
    )
    ?.closest(".cell");
};
