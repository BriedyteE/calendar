// import { closeModalOnEsc } from "./closeEventModal.js";
import {
  saveEvent,
  deleteEvent,
  updateEvent,
  closeEventModal,
  navigateToSelectedDate,
  addEventSlot,
} from "./index.js";

export const openEventModal = ({
  date,
  startTime,
  endTime,
  title = "",
  eventId = null,
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

  deleteButton.style.display = !!eventId ? "inline-block" : "none";
  dateInput.value = date;
  startTimeInput.value = startTime;
  endTimeInput.value = endTime;
  titleInput.value = title;

  modalWrapper.classList.add("visible");

  modalWrapper.onclick = (e) => {
    if (e.target === e.currentTarget) {
      closeEventModal({ isEventSaved: !!eventId });
    }
  };

  closeButton.onclick = () => closeEventModal({ isEventSaved: !!eventId });
  deleteButton.onclick = () => deleteEvent(dateInput.value, eventId);
  titleInput.onblur = () => titleWrapper.classList.remove("error");

  dateInput.onchange = (e) => {
    navigateToSelectedDate(new Date(e.target.value));
    addEventSlot({
      event: {
        date: e.target.value,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
        title: titleInput.value,
        id: eventId,
      },
      isModalOpen: true,
    });
  };

  startTimeInput.onchange = (e) => {
    addEventSlot({
      event: {
        date: dateInput.value,
        startTime: e.target.value,
        endTime: endTimeInput.value,
        title: titleInput.value,
        id: eventId,
      },
      isModalOpen: true,
    });
  };

  endTimeInput.onchange = (e) => {
    addEventSlot({
      event: {
        date: dateInput.value,
        startTime: startTimeInput.value,
        endTime: e.target.value,
        title: titleInput.value,
        id: eventId,
      },
      isModalOpen: true,
    });
  };

  form.onsubmit = (e) => {
    e.preventDefault();

    if (!titleInput.value) {
      titleInput.focus();
      titleWrapper.classList.add("error");
      return;
    }

    if (eventId) {
      updateEvent({
        title: titleInput.value,
        date: dateInput.value,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
        id: eventId,
      });
    } else {
      saveEvent({
        title: titleInput.value,
        date: dateInput.value,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
      });
    }
  };

  // document.addEventListener("keydown", closeModalOnEsc);
};
