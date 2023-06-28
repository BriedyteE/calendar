const weekGrid = document.getElementById("week-grid");
const currentDate = new Date();

const renderWeekView = () => {
  const dayColumns = [...Array(8).keys()];
  const hourCells = [...Array(25).keys()];
  const currentWeekDay = currentDate.getDay();

  dayColumns.forEach((columnIndex) => {
    const isCurrentDay = currentWeekDay === columnIndex;
    const dayColumn = weekGrid.appendChild(document.createElement("div"));

    hourCells.forEach((cellIndex) => {
      const hourCell = dayColumn.appendChild(document.createElement("div"));
      hourCell.textContent = columnIndex && cellIndex === 0 ? columnIndex : "";
      hourCell.className =
        cellIndex === 0 && isCurrentDay ? "cell current-day-header" : "cell";
    });
  });
};

renderWeekView();
