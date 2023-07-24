import { DAY_NAMES, MONTHS } from "./constants.js";
import { createNewElement, getDateData } from "./utils.js";

const mainWeekGrid = document.querySelector(".week-grid");
const miniMonthGrid = document.querySelector(".month-grid");

const { formattedDate: currentDate } = getDateData(new Date());
let mainCalendarDate = new Date();
let miniCalendarDate = new Date();

const renderEventModal = (date) => {
  const { formattedDate } = getDateData(date);
  const modal = document.querySelector(".event-modal");
  const dateInput = modal.querySelector("input.full-date");

  dateInput.value = formattedDate;
  modal.classList.add("visible");

  dateInput.addEventListener("change", (e) => {
    navigateToSelectedDate(new Date(e.target.value));
  });

  modal
    .querySelector(".event-modal .close")
    .addEventListener("click", () => modal.classList.remove("visible"));
};

const navigateToSelectedDate = (selectedDate) => {
  const { month, formattedDate } = getDateData(selectedDate);
  mainCalendarDate = new Date(formattedDate);
  renderMainCalendar();

  if (month === miniCalendarDate.getMonth()) {
    const className = "selected-day";
    const selectedCell = document
      .querySelector(`.month-grid time[datetime="${formattedDate}"]`)
      .closest("button");

    document
      .querySelectorAll(`.${className}`)
      ?.forEach((item) => item.classList.remove(className));

    selectedCell.classList.add(className);
  } else {
    miniCalendarDate = new Date(formattedDate);
    renderMiniCalendar();
  }
};

const renderMainCalendar = () => {
  mainWeekGrid.innerHTML = "";

  const columnIndexes = [...Array(8).keys()];
  const cellIndexes = [...Array(25).keys()];

  let displayedMonts = [];
  let displayedYears = [];

  columnIndexes.forEach((columnIndex) => {
    const column = mainWeekGrid.appendChild(
      createNewElement({ elementTag: "div" })
    );

    const displayedDate = getDateData(mainCalendarDate);

    const currentColumnDate = new Date(
      displayedDate.year,
      displayedDate.month,
      displayedDate.dayOfMonth - dayOfWeek + columnIndex
    );

    const {
      dayOfMonth,
      month,
      year,
      formattedDate: columnDate,
    } = getDateData(currentColumnDate);

    if (!displayedMonts.includes(MONTHS[month]) && columnIndex) {
      displayedMonts.push(MONTHS[month]);
      displayedYears.push(year);
    }

    cellIndexes.forEach((cellIndex) => {
      const baseCellClass = "cell";

      if (cellIndex === 0) {
        const dayOfWeek = DAY_NAMES[columnIndex]?.toUpperCase().substr(0, 3);

        column.appendChild(
          createNewElement({
            elementTag: "div",
            innerHTML:
              dayOfWeek &&
              `<time datetime="${columnDate}">${dayOfWeek}<span>${dayOfMonth}</span></time>`,
            attributes: {
              className:
                "header-cell" +
                (currentDate === columnDate ? " current-day" : ""),
            },
          })
        );

        return;
      }

      if (columnIndex === 0 && cellIndex) {
        const time =
          cellIndex <= 12 ? `${cellIndex} AM` : `${cellIndex - 12} PM`;

        column.appendChild(
          createNewElement({
            elementTag: "div",
            innerHTML: cellIndex !== 24 ? `<span>${time}</span>` : "",
            attributes: { className: baseCellClass + " time-cell" },
          })
        );
        return;
      }

      const cell = column.appendChild(
        createNewElement({
          elementTag: "button",
          attributes: { className: baseCellClass },
        })
      );

      cell.addEventListener("click", () => {
        renderEventModal(currentColumnDate);
      });
    });
  });

  const dateRange = displayedMonts
    .map((month, index) =>
      displayedYears[index] !== displayedYears[index + 1]
        ? `${month} ${displayedYears[index]}`
        : month
    )
    .join(" - ");

  document.querySelector("header .date").textContent = dateRange;
};

const renderMiniCalendar = () => {
  miniMonthGrid.innerHTML = "";

  const cellIndexes = [...Array(49).keys()];
  const firstDayDate = new Date(
    miniCalendarDate.getFullYear(),
    miniCalendarDate.getMonth(),
    1
  );

  const {
    dayOfMonth: firstDayOfMonth,
    dayOfWeek: firstDayOfWeek,
    month,
    year,
  } = getDateData(firstDayDate);

  document.querySelector(
    "aside .date"
  ).textContent = `${MONTHS[month]} ${year}`;

  cellIndexes.forEach((cellIndex) => {
    const baseClassName = "cell";

    if (cellIndex <= 6) {
      miniMonthGrid.appendChild(
        createNewElement({
          elementTag: "div",
          innerHTML: `<h3>${DAY_NAMES[cellIndex + 1][0].toUpperCase()}</h3>`,
          attributes: { className: baseClassName },
        })
      );
      return;
    }

    const currCellDate = new Date(
      year,
      month,
      firstDayOfMonth - firstDayOfWeek + cellIndex - 6
    );

    const {
      dayOfMonth: cellDay,
      month: cellMonth,
      year: cellYear,
      formattedDate: cellDate,
    } = getDateData(currCellDate);

    const getCellClass = () => {
      const { formattedDate: mainCalendarDate } = getDateData(mainCalendarDate);
      const currDayClass = cellDate === currentDate ? " current-day" : "";
      const currMonthClass = cellMonth === month ? " current-month" : "";
      const selectedDayClass =
        cellDate === mainCalendarDate ? " selected-day" : "";

      return baseClassName + currDayClass + currMonthClass + selectedDayClass;
    };

    const dateCell = miniMonthGrid.appendChild(
      createNewElement({
        elementTag: "button",
        innerHTML: `<time datetime="${cellDate}">${cellDay}</time>`,
        attributes: {
          className: getCellClass(),
        },
      })
    );

    dateCell.addEventListener("click", () => {
      navigateToSelectedDate(new Date(cellYear, cellMonth, cellDay));
    });
  });
};

document
  .querySelector("header .today-btn")
  .addEventListener("click", () => navigateToSelectedDate(new Date()));

document.querySelectorAll(".week.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const { year, month, dayOfMonth } = getDateData(mainCalendarDate);

    mainCalendarDate = new Date(
      year,
      month,
      index === 0 ? dayOfMonth - 7 : dayOfMonth + 7
    );

    navigateToSelectedDate(mainCalendarDate);
  });
});

document.querySelectorAll(".month.navigation-btn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const { year, month, dayOfMonth } = getDateData(miniCalendarDate);
    miniCalendarDate = new Date(
      year,
      index === 0 ? month - 1 : month + 1,
      dayOfMonth
    );
    renderMiniCalendar();
  });
});

renderMainCalendar();
renderMiniCalendar();
