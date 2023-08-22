import { createNewElement } from "../utils/elements.js";

export const createLoadingSpinner = (containerClassName) => {
  const spinnerContainer = createNewElement({
    elementTag: "div",
    attributes: { class: containerClassName },
  });

  spinnerContainer.appendChild(
    createNewElement({
      elementTag: "div",
      attributes: { class: "loading-spinner" },
    })
  );

  return spinnerContainer;
};
