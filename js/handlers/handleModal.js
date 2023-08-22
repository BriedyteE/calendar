import { addEventSlot } from "../views/index.js";
import {
  deleteEvent,
  saveEvent,
  updateEvent,
  navigateToSelectedDate,
} from "./index.js";

import { calculateEventDuration } from "../utils/dateTime.js";

export const closeEventModal = ({ isEventSaved }) => {
  const modalWrapper = document.querySelector(".modal-backdrop");
  const eventSlot = document.querySelector(".event.open");

  const form = modalWrapper.querySelector("form");
  const submitButton = form.querySelector("button");

  submitButton.removeAttribute("disabled");
  form
    .querySelectorAll(".error")
    .forEach((item) => item.classList.remove("error"));
  form.reset();

  if (isEventSaved) {
    eventSlot.classList.remove("open");
  } else {
    eventSlot.remove();
  }

  modalWrapper.classList.remove("visible");
};

export const onDelete = (savedDate, eventId) => {
  deleteEvent({
    savedDate,
    eventId,
    onSuccess: () => {
      closeEventModal({ isEventSaved: false });
    },
    onError: (e) => console.log(e),
  });
};

export const onDateTimeChange = (event) => {
  navigateToSelectedDate(event.date);

  addEventSlot({ event, isModalOpen: true });
};

const addSlotAndCloseModal = (event) => {
  addEventSlot({ event: event, isModalOpen: true });
  closeEventModal({ isEventSaved: true });
};

export const onSubmit = (event, savedDate) => {
  if (event.id) {
    updateEvent({
      updatedEvent: event,
      savedDate,
      onSuccess: addSlotAndCloseModal,
      onError: (e) => console.log(e),
    });
  } else {
    saveEvent({
      event,
      onSuccess: addSlotAndCloseModal,
      onError: (e) => console.log(e),
    });
  }
};

export const validateTimeInputs = () => {
  const startTimeInput = document.getElementById("start-time");
  const endTimeInput = document.getElementById("end-time");
  const dateErrorText = document.querySelector(".date-error");

  dateErrorText.classList.remove("error");

  const eventDurationInSeconds = calculateEventDuration(
    startTimeInput.value,
    endTimeInput.value
  );

  const isEventDurationValid = eventDurationInSeconds > 0;

  if (!isEventDurationValid) {
    dateErrorText.classList.add("error");
  }

  return isEventDurationValid;
};
