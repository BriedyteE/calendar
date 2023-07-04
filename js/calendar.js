import { DAY_NAMES } from "./contants.js";
import { createNewElement } from "./utils.js";

const weekGrid = document.getElementById("week-grid");
const currentDate = new Date();

const renderWeekView = () => {
  const dayColumns = [...Array(8).keys()];
  const hourCells = [...Array(25).keys()];
  const currentWeekDay = currentDate.getDay();
  const currentMonthDay = currentDate.getDate();

  dayColumns.forEach((columnIndex) => {
    const currentColumnDay = new Date();
    currentColumnDay.setDate(
      columnIndex <= currentWeekDay
        ? currentMonthDay - (currentWeekDay - columnIndex)
        : currentMonthDay + (columnIndex - currentWeekDay)
    );
    const dayColumn = weekGrid.appendChild(
      createNewElement({ elementTag: "div" })
    );

    hourCells.forEach((cellIndex) => {
      const getCellContentAndClassName = () => {
        const baseClass = "cell";

        if (columnIndex && cellIndex === 0) {
          const date = currentColumnDay.getDate();

          return {
            content: `<h3>${DAY_NAMES[columnIndex]}<br>${date}</h3>`,
            className:
              currentWeekDay === columnIndex
                ? baseClass + " current-day-header"
                : baseClass,
          };
        } else if (columnIndex === 0 && cellIndex) {
          const time =
            cellIndex <= 12 ? `${cellIndex} AM` : `${cellIndex - 12} PM`;

          return {
            content: `<span>${time}</span>`,
            className: baseClass + " time-cell",
          };
        }

        return { content: null, className: baseClass };
      };
      const { content, className } = getCellContentAndClassName();

      dayColumn.appendChild(
        createNewElement({
          elementTag: "div",
          innerHTML: content,
          attributes: { className },
        })
      );
    });
  });
};

renderWeekView();
