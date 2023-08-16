import { calculateEventDurationFromInputs } from "../utils/dateTime.js";

export const validateForm = () => {
  const startTimeInput = document.getElementById("start-time");
  const endTimeInput = document.getElementById("end-time");
  const dateErrorText = document.querySelector(".date-error");
  const titleWrapper = document.querySelector(".title-wrapper");
  const titleInput = document.getElementById("event-title");

  if (!titleInput.value) {
    titleInput.focus();
    titleWrapper.classList.add("error");
  }

  const eventDurationInSeconds = calculateEventDurationFromInputs(
    startTimeInput.value,
    endTimeInput.value
  );

  const isEventDurationValid = eventDurationInSeconds > 0;

  if (!isEventDurationValid) {
    dateErrorText.classList.add("error");
  }

  return isEventDurationValid;
};
