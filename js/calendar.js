import { DAY_NAMES } from "./contants.js";
import { createNewElement } from "./utils.js";

const weekGrid = document.querySelector(".week-grid");
const monthGrid = document.querySelector(".month-grid");
const weekGridNavigationButtons = document.querySelectorAll(
  ".week.navigation-btn"
);
const monthGridNavigationButtons = document.querySelectorAll(
  ".month.navigation-btn"
);

const {
  dayOfWeek,
  dayOfMont,
  month,
  year,
  formattedDate: currentDate,
} = getDateData();

let firstDayInWeekGrid = dayOfMont - (dayOfWeek - 1);
let monthInMonthGrid = month;

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
    const column = weekGrid.appendChild(
      createNewElement({ elementTag: "div" })
    );

    cellIndexes.forEach((cellIndex) => {
      const getCellContentAndClassName = () => {
        const baseClass = "cell";

        if (columnIndex && cellIndex === 0) {
          const currentColumnDate = new Date();
          currentColumnDate.setDate(firstDayInWeekGrid + (columnIndex - 1));

          const { dayOfMont, formattedDate: columnDate } =
            getDateData(currentColumnDate);

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

const renderMonthGrid = () => {
  const cellIndexes = [...Array(49).keys()];

  cellIndexes.forEach((cellIndex) => {
    const baseClass = "cell";

    if (cellIndex <= 6) {
      monthGrid.appendChild(
        createNewElement({
          elementTag: "div",
          innerHTML: `<h3>${DAY_NAMES[cellIndex + 1][0].toUpperCase()}</h3>`,
          attributes: { className: baseClass },
        })
      );

      return;
    }
    const cellDate = new Date(year, monthInMonthGrid, 1);
    cellDate.setDate(cellDate.getDate() - cellDate.getDay() + (cellIndex - 6));
    const { dayOfMont, formattedDate: currCellDate } = getDateData(cellDate);

    monthGrid.appendChild(
      createNewElement({
        elementTag: "div",
        innerHTML: `<span>${dayOfMont}</span>`,
        attributes: {
          className:
            currCellDate === currentDate
              ? baseClass + " current-day"
              : baseClass,
        },
      })
    );
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

monthGridNavigationButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    monthInMonthGrid =
      index === 0 ? monthInMonthGrid - 1 : monthInMonthGrid + 1;

    monthGrid.innerHTML = "";
    renderMonthGrid();
  });
});

renderWeekGrid();
renderMonthGrid();
