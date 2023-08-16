// export const closeModalOnEsc = ({ e, isEventSaved, onModalClose }) => {
//   console.log(onModalClose);
//   if (e.key === "Escape") {
//     closeEventModal({ isEventSaved, onModalClose });
//   }
// };

export const closeEventModal = ({ isEventSaved }) => {
  const modalWrapper = document.querySelector(".modal-backdrop");
  const form = modalWrapper.querySelector("form");
  const eventSlot = document.querySelector(".event.open");
  const erroredItems = modalWrapper.querySelectorAll(".error");

  if (isEventSaved) {
    eventSlot.classList.remove("open");
  } else {
    eventSlot.remove();
  }

  modalWrapper.classList.remove("visible");
  erroredItems.forEach((item) => item.classList.remove("error"));
  // document.removeEventListener("keydown", closeModalOnEsc);
  form.reset();
};
