import { createNewElement } from "../utils/elements.js";
import { DAY_NAMES } from "../constants.js";

export const createMonthCalendarHeader = (daysCount) => {
  const header = createNewElement({
    elementTag: "div",
    attributes: { class: "header" },
  });

  for (let i = 1; i <= daysCount; i++) {
    header.appendChild(
      createNewElement({
        elementTag: "div",
        innerHTML: `<h3>${DAY_NAMES[i][0].toUpperCase()}</h3>`,
        attributes: { class: "cell header-cell" },
      })
    );
  }

  return header;
};
