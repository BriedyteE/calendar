import { createNewElement } from "../utils/elements.js";

export const createLoadingSpinner = () => {
  const spinnerContainer = createNewElement({
    elementTag: "div",
    attributes: { className: "spinner-container" },
  });

  spinnerContainer.appendChild(
    createNewElement({
      elementTag: "div",
      attributes: { className: "loading-spinner" },
    })
  );

  return spinnerContainer;
};
