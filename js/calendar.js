import { DAY_NAMES } from "./contants.js";
import { createNewElement } from "./utils.js";

const weekGrid = document.querySelector(".week-grid");
const weekGridNavigationButtons = document.querySelectorAll(
  ".week.navigation-btn"
);

console.log("weekGrid", weekGrid);

const { dayOfWeek, dayOfMont, formattedDate: currentDate } = getDateData();
let firstDayInWeekGrid = dayOfMont - (dayOfWeek - 1);

function getDateData(date = new Date()) {
  const dayOfWeek = date.getDay();
  const dayOfMont = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const formattedDate = [dayOfMont, month, year].join("/");

  return {
    dayOfWeek: dayOfWeek === 0 ? 7 : dayOfWeek,
    dayOfMont,
    month,
    year,
    formattedDate,
  };
}

const renderWeekGrid = () => {
  const columnIndexes = [...Array(8).keys()];
  const cellIndexes = [...Array(25).keys()];

  columnIndexes.forEach((columnIndex) => {
    const currentColumnDate = new Date();
    currentColumnDate.setDate(firstDayInWeekGrid + (columnIndex - 1));

    const { dayOfMont, formattedDate: columnDate } =
      getDateData(currentColumnDate);

    const column = weekGrid.appendChild(
      createNewElement({ elementTag: "div" })
    );

    cellIndexes.forEach((cellIndex) => {
      const getCellContentAndClassName = () => {
        const baseClass = "cell";

        if (columnIndex && cellIndex === 0) {
          return {
            content: `<h3>${DAY_NAMES[columnIndex]}<br>${dayOfMont}</h3>`,
            className:
              columnDate === currentDate
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

      column.appendChild(
        createNewElement({
          elementTag: "div",
          innerHTML: content,
          attributes: { className },
        })
      );
    });
  });
};

weekGridNavigationButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    firstDayInWeekGrid =
      index === 0 ? firstDayInWeekGrid - 7 : firstDayInWeekGrid + 7;

    weekGrid.innerHTML = "";
    renderWeekGrid();
  });
});

renderWeekGrid();
