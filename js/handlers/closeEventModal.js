export const closeEventModal = ({ isEventSaved }) => {
  const modalWrapper = document.querySelector(".modal-backdrop");
  const form = modalWrapper.querySelector("form");
  const eventSlot = document.querySelector(".event.open");
  const erroredItems = modalWrapper.querySelectorAll(".error");
  const submitButton = form.querySelector("button");

  if (isEventSaved) {
    eventSlot.classList.remove("open");
  } else {
    eventSlot.remove();
  }

  modalWrapper.classList.remove("visible");
  submitButton.removeAttribute("disabled");
  erroredItems.forEach((item) => item.classList.remove("error"));

  form.reset();
};
