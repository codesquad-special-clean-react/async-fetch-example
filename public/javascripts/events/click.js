export const toggleModal = (open = true) => {
  const modal = document.querySelector(".new-question-wrap");
  modal.style.display = open ? "block" : "none";
};

export const addClick = () => {
  document.addEventListener("click", (event) => {
    switch (event.target.className) {
      case "new-question-btn":
        return toggleModal(true);
      case "close-btn":
        return toggleModal(false);
    }
  });
};
