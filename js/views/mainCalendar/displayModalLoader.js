import { createLoadingSpinner } from "../../elements/index.js";

export const displayModalLoader = (isVisible) => {
  const modal = document.querySelector(".event-modal");
  const className = "spinner-container";

  if (isVisible) {
    const spinner = createLoadingSpinner(className);
    modal.appendChild(spinner);
  } else {
    modal.querySelector(`.${className}`).remove();
  }
};
