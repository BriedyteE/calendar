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
