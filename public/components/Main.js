import { getAllData } from "../api/fetch.js";
import { modalToggle } from "./Modal.js";

export function Main() {
  const questionBtn = document.querySelector(".new-question-btn");
  const commentCreateBtn = document.querySelector(".answer-submit");

  getAllData();

  questionBtn.addEventListener("click", () => {
    modalToggle(true);
  });

  console.log(commentCreateBtn);
}
