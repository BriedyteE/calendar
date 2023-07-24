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

export const getDateData = (date) => {
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const formattedDate = [
    year,
    month + 1 > 9 ? month + 1 : `0${month + 1}`,
    dayOfMonth > 9 ? dayOfMonth : `0${dayOfMonth}`,
  ].join("-");

  return {
    dayOfWeek: dayOfWeek === 0 ? 7 : dayOfWeek,
    dayOfMonth,
    month,
    year,
    formattedDate,
  };
};
