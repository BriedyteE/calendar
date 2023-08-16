import { createNewElement } from "../utils/elements.js";

export const createHoursColumn = (hourCount) => {
  const column = createNewElement({
    elementTag: "div",
    attributes: { className: "hours" },
  });

  for (let i = 0; i < hourCount; i++) {
    const time = i <= 12 ? `${i} AM` : `${i - 12} PM`;

    column.appendChild(
      createNewElement({
        elementTag: "div",
        innerHTML: i ? `<span>${time}</span>` : "",
        attributes: {
          className: i ? "cell hour-cell" : "cell corner-cell",
        },
      })
    );
  }

  return column;
};
