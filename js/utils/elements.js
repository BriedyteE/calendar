export const createNewElement = ({
  elementTag,
  textContent,
  attributes = {},
  innerHTML = null,
}) => {
  const newElement = document.createElement(elementTag);
  newElement.innerHTML = innerHTML;

  if (textContent) {
    newElement.textContent = textContent;
  }

  Object.assign(newElement, attributes);
  return newElement;
};
