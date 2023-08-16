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
    attributes: { className: "body" },
  });

  for (let i = 0; i < rowsCount; i++) {
    const row = calendarBody.appendChild(
      createNewElement({
        elementTag: "div",
        attributes: { className: "row" },
      })
    );

    for (let j = 1; j <= weekDaysCount; j++) {
      const monthStart = getDateData(monthStartDate);
      const cellDate = getDateData(
        new Date(
          monthStart.year,
          monthStart.month,
          monthStart.dayOfMonth - monthStart.dayOfWeek + j + weekDaysCount * i
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
            className: getCellClass(),
          },
        })
      );

      cell.addEventListener("click", (e) => {
        onCellClick?.(e, cellDate.date);
      });
    }
  }

  return calendarBody;
};
