import { createNewElement } from "../utils/elements.js";

export const createLoadingSpinner = (containerClassName) => {
  const spinnerContainer = createNewElement({
    elementTag: "div",
    attributes: { className: containerClassName },
  });

  spinnerContainer.appendChild(
    createNewElement({
      elementTag: "div",
      attributes: { className: "loading-spinner" },
    })
  );

  return spinnerContainer;
};
