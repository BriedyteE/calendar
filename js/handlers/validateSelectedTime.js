import { calculateEventDurationFromInputs } from "../utils/dateTime.js";

export const validateSelectedTime = () => {
  const startTimeInput = document.getElementById("start-time");
  const endTimeInput = document.getElementById("end-time");
  const dateErrorText = document.querySelector(".date-error");

  dateErrorText.classList.remove("error");

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
