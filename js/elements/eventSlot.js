import { createNewElement } from "../utils/elements.js";

export const createEventSlot = ({
  height,
  topPossition,
  onClick,
  isModalOpen,
  title,
  startTime,
}) => {
  const eventSlot = createNewElement({
    elementTag: "div",
    attributes: {
      class: isModalOpen ? "event open" : "event",
      "data-starttime": startTime,
    },
    textContent: title,
  });

  eventSlot.style.height = height;
  eventSlot.style.top = topPossition;

  eventSlot.addEventListener("click", () => {
    eventSlot.classList.add("open");
    onClick();
  });

  return eventSlot;
};
