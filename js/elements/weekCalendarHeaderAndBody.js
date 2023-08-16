import { createNewElement } from "../utils/elements.js";
import { getDateData } from "../utils/dateTime.js";
import { DAY_NAMES } from "../constants.js";

export const createWeekCalendarHeaderAndBody = ({
  daysCount,
  hoursCount,
  firstDateOfWeek,
  onCellClick,
  formattedCurrentDate,
}) => {
  const caldendarBody = createNewElement({
    elementTag: "div",
    attributes: { className: "body" },
  });

  const firstDate = getDateData(firstDateOfWeek);

  for (let columnIndex = 0; columnIndex < daysCount; columnIndex++) {
    const column = caldendarBody.appendChild(
      createNewElement({
        elementTag: "div",
        attributes: { className: "column" },
      })
    );

    const { dayOfMonth, formattedDate: formattedColumnDate } = getDateData(
      new Date(
        firstDate.year,
        firstDate.month,
        firstDate.dayOfMonth + columnIndex
      )
    );

    for (let cellIndex = 0; cellIndex <= hoursCount; cellIndex++) {
      if (cellIndex === 0) {
        const dayOfWeek = DAY_NAMES[columnIndex + 1]
          ?.toUpperCase()
          .substr(0, 3);

        column.appendChild(
          createNewElement({
            elementTag: "time",
            innerHTML: `${dayOfWeek}<span>${dayOfMonth}</span>`,
            attributes: {
              dateTime: formattedColumnDate,
              className:
                "cell header-cell " +
                (formattedColumnDate === formattedCurrentDate
                  ? " current-day"
                  : ""),
            },
          })
        );

        continue;
      }

      const cell = column.appendChild(
        createNewElement({
          elementTag: "div",
          attributes: {
            className: "cell",
          },
        })
      );

      cell.addEventListener("click", (e) => {
        onCellClick(e, formattedColumnDate, cellIndex);
      });
    }
  }

  return caldendarBody;
};
