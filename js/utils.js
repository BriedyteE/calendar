export const createNewElement = ({
  elementTag,
  innerHTML = null,
  text = null,
  attributes = null,
}) => {
  const newElement = document.createElement(elementTag);
  newElement.textContent = text;
  newElement.innerHTML = innerHTML;

  if (attributes) {
    Object.assign(newElement, { ...attributes });
  }

  return newElement;
};
