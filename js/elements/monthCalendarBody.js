import { getDateData } from "../utils/dateTime.js";
import { createNewElement } from "../utils/elements.js";

export const createMonthCalendarBody = ({
  monthStartDate,
  formattedCurrentDate,
  formattedSelectedDate,
  rowsCount,
  weekDaysCount,
  onCellClick,
}) => {
  const calendarBody = createNewElement({
    elementTag: "div",
    attributes: { class: "body" },
  });

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const row = calendarBody.appendChild(
      createNewElement({
        elementTag: "div",
        attributes: { class: "row" },
      })
    );

    for (let cellIndex = 1; cellIndex <= weekDaysCount; cellIndex++) {
      const monthStart = getDateData(monthStartDate);
      const cellDate = getDateData(
        new Date(
          monthStart.year,
          monthStart.month,
          monthStart.dayOfMonth -
            monthStart.dayOfWeek +
            cellIndex +
            weekDaysCount * rowIndex
        )
      );

      const getCellClass = () => {
        const currDayClass =
          cellDate.formattedDate === formattedCurrentDate ? " current-day" : "";

        const currMonthClass =
          cellDate.month === monthStart.month ? " current-month" : "";

        const selectedDayClass =
          cellDate.formattedDate === formattedSelectedDate
            ? " selected-day"
            : "";

        return "cell" + currDayClass + currMonthClass + selectedDayClass;
      };

      const cell = row.appendChild(
        createNewElement({
          elementTag: "div",
          innerHTML: `<time datetime="${cellDate.formattedDate}">${cellDate.dayOfMonth}</time>`,
          attributes: {
            class: getCellClass(),
          },
        })
      );

      cell.addEventListener("click", (e) => {
        onCellClick?.(e, cellDate.formattedDate);
      });
    }
  }

  return calendarBody;
};
