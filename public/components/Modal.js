import { createQuestion } from "../api/fetch.js";

export const modalInputContents = {
  title: "",
  content: "",
};

export const modalToggle = (isModalState) => {
  isModalState
    ? (document.querySelector(".new-question-wrap").style.display = "block")
    : (document.querySelector(".new-question-wrap").style.display = "none");
};

export const Modal = () => {
  const modalForm = document.getElementById("new-q-form");
  const modalInputs = modalForm.querySelectorAll(".input");
  const submitBtn = document.getElementById("q-submit");
  const closeBtn = document.querySelector(".close-btn");

  modalInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      const { value } = input;

      input === document.getElementById("q-title")
        ? (modalInputContents.title = value)
        : (modalInputContents.content = value);
    });

    closeBtn.addEventListener("click", () => {
      modalToggle(false);
    });

    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      createQuestion();
      modalToggle(false);
    });
  });
};
