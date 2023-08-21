// import { closeModalOnEsc } from "./closeEventModal.js";
import { validateSelectedTime } from "../../handlers/index.js";

export const displayEventModal = ({
  event: { date, startTime, endTime, title = "", id = null },
  onDateTimeChange,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const modalWrapper = document.querySelector(".modal-backdrop");
  const form = modalWrapper.querySelector("form");
  const dateInput = document.querySelector("input.full-date");
  const titleWrapper = document.querySelector(".title-wrapper");
  const titleInput = document.getElementById("event-title");
  const startTimeInput = document.getElementById("start-time");
  const endTimeInput = document.getElementById("end-time");
  const deleteButton = modalWrapper.querySelector(".delete");
  const closeButton = modalWrapper.querySelector(".close");
  const submitButton = form.querySelector("button");

  deleteButton.style.display = !!id ? "inline-block" : "none";
  dateInput.value = date;
  startTimeInput.value = startTime;
  endTimeInput.value = endTime;
  titleInput.value = title;

  const getEvent = () => {
    return {
      date: dateInput.value,
      startTime: startTimeInput.value,
      endTime: endTimeInput.value,
      title: titleInput.value,
      id,
    };
  };

  const closeModal = () => {
    onClose({ isEventSaved: !!id });
  };

  modalWrapper.classList.add("visible");

  modalWrapper.onclick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  closeButton.onclick = closeModal;
  deleteButton.onclick = () => onDelete(dateInput.value, id);
  titleInput.onblur = () => titleWrapper.classList.remove("error");

  dateInput.onchange = () => {
    const event = getEvent();
    onDateTimeChange(event);
  };

  startTimeInput.onchange = () => {
    submitButton.removeAttribute("disabled");
    const isValid = validateSelectedTime();
    if (!isValid) {
      submitButton.setAttribute("disabled", true);
      return;
    }
    const event = getEvent();
    onDateTimeChange(event);
  };

  endTimeInput.onchange = () => {
    submitButton.removeAttribute("disabled");
    const isValid = validateSelectedTime();
    if (!isValid) {
      submitButton.setAttribute("disabled", true);
      return;
    }
    const event = getEvent();
    onDateTimeChange(event);
  };

  form.onsubmit = (e) => {
    e.preventDefault();

    if (!titleInput.value) {
      titleInput.focus();
      titleWrapper.classList.add("error");
      return;
    }

    const event = getEvent();
    onSubmit(event, date);
  };
};
