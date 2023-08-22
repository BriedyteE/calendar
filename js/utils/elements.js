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

  Object.keys(attributes).forEach((attributeKey) => {
    newElement.setAttribute(attributeKey, attributes[attributeKey]);
  });

  return newElement;
};
