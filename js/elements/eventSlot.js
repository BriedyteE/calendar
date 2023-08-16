import { createNewElement } from "../utils/elements.js";

export const createEventSlot = ({
  height,
  topPossition,
  onClick,
  isModalOpen,
  title,
}) => {
  const eventSlot = createNewElement({
    elementTag: "div",
    attributes: { className: isModalOpen ? "event open" : "event" },
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
