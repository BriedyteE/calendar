import { DAY_NAMES, MONTHS } from "./constants.js";
import { createNewElement, getDateData } from "./utils.js";

const mainWeekGrid = document.querySelector(".week-grid");
const miniMonthGrid = document.querySelector(".month-grid");

const { formattedDate: currentDate } = getDateData(new Date());
let targetDate = new Date();
let highlitedDay;

const renderEventModal = (date) => {
  const { formattedDate } = getDateData(date);
  const modal = document.querySelector(".event-modal");
  const dateInput = modal.querySelector("input.full-date");

  dateInput.value = formattedDate;
  modal.classList.add("visible");

  modal
    .querySelector(".event-modal .close")
    .addEventListener("click", () => modal.classList.remove("visible"));
};

const renderMainCalendar = () => {
  mainWeekGrid.innerHTML = "";

  const columnIndexes = [...Array(8).keys()];
  const cellIndexes = [...Array(25).keys()];
  let { targetMonths, targetYears } = { targetMonths: [], targetYears: [] };

  columnIndexes.forEach((columnIndex) => {
    const column = mainWeekGrid.appendChild(
      createNewElement({ elementTag: "div" })
    );
    const targetDayOfWeek = targetDate.getDay() === 0 ? 7 : targetDate.getDay();

    const currentColumnDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate() - targetDayOfWeek + columnIndex
    );

    const {
      dayOfMonth,
      month,
      year,
      formattedDate: columnDate,
    } = getDateData(currentColumnDate);

    if (!targetMonths.includes(MONTHS[month]) && columnIndex) {
      targetMonths.push(MONTHS[month]);
      targetYears.push(year);
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

      const hourCell = column.appendChild(
        createNewElement({
          elementTag: "button",
          attributes: { className: baseCellClass },
        })
      );

      hourCell.addEventListener("click", () => {
        document.querySelector("main .event-modal").classList.add("visible");
        renderEventModal(currentColumnDate);
      });
    });
  });

  const dateRange = targetMonths
    .map((month, index) =>
      targetYears[index] !== targetYears[index + 1]
        ? `${month} ${targetYears[index]}`
        : month
    )
    .join(" - ");

  document.querySelector("header .date").textContent = dateRange;
};

const highliteNewCell = (element) => {
  const className = "highlited-day";
  document
    .querySelectorAll(`.${className}`)
    ?.forEach((item) => item.classList.remove(className));

  element.classList.add(className);
};

const renderMiniCalendar = () => {
  miniMonthGrid.innerHTML = "";

  const cellIndexes = [...Array(49).keys()];
  const firstDayDate = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    1
  );

  const {
    dayOfMonth: firstDayOfTargetMonth,
    dayOfWeek: firstDayOfTargetWeek,
    month: targetMonth,
    year: targetYear,
  } = getDateData(firstDayDate);

  document.querySelector(
    "aside .date"
  ).textContent = `${MONTHS[targetMonth]} ${targetYear}`;

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
      targetYear,
      targetMonth,
      firstDayOfTargetMonth - firstDayOfTargetWeek + cellIndex - 6
    );

    const {
      dayOfMonth: cellDay,
      month: cellMonth,
      year: cellYear,
      formattedDate: cellDate,
    } = getDateData(currCellDate);

    const getCellClass = () => {
      const currDayClass = cellDate === currentDate ? " current-day" : "";
      const currMonthClass = cellMonth === targetMonth ? " current-month" : "";
      const highlitedClass = cellDate === highlitedDay ? " highlited-day" : "";

      return baseClassName + currDayClass + currMonthClass + highlitedClass;
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
      targetDate = new Date(cellYear, cellMonth, cellDay);
      highlitedDay = getDateData(targetDate).formattedDate;

      if (targetMonth === cellMonth) {
        highliteNewCell(dateCell);
      } else {
        renderMiniCalendar();
      }

      renderMainCalendar();
    });
  });
};

document.querySelector("header .today-btn").addEventListener("click", () => {
  targetDate = new Date();
  renderMainCalendar();
  renderMiniCalendar();
});

document.querySelectorAll(".navigation-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { year, month, dayOfMonth } = getDateData(targetDate);
    const isBack = [...button.classList].includes("left");

    if ([...button.classList].includes("week")) {
      const currCalendarMonth = month;
      targetDate = new Date(
        year,
        month,
        isBack ? dayOfMonth - 7 : dayOfMonth + 7
      );
      const { formattedDate, month: selectedMonth } = getDateData(targetDate);

      renderMainCalendar();

      if (currCalendarMonth === selectedMonth) {
        highliteNewCell(
          document
            .querySelector(`.month-grid time[datetime="${formattedDate}"]`)
            .closest("button")
        );
      } else {
        highlitedDay = formattedDate;
        renderMiniCalendar();
      }

      return;
    }

    targetDate = new Date(year, isBack ? month - 1 : month + 1, dayOfMonth);
    renderMiniCalendar();
  });
});

renderMainCalendar();
renderMiniCalendar();
