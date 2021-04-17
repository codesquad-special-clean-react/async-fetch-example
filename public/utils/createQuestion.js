import renderQnA from "../qna.js";
import { postQuestions } from "../service/api.js";

const $newQuestionModalOpenBtn = document.querySelector(".new-question-btn");
const $newQuestionModal = document.querySelector(".new-question-wrap");
const $newQuestionModalCloseBtn = document.querySelector(
  ".new-question-wrap > .close-btn"
);
const $titleInputText = document.querySelector("#q-title");
const $contentTextArea = document.querySelector("#q-content");
const $newQuestionForm = document.querySelector("#new-q-form");

let newQuestion = {
  title: "",
  question: ""
};

const createQuestion = async () => {
  newQuestion = { ...newQuestion, userId: 2 };

  await postQuestions(newQuestion);
  await renderQnA();
};

const openNewQuestionModal = () => {
  $newQuestionModal.style.display = "block";
};

const closeNewQuestionModal = () => {
  $newQuestionModal.style.display = "none";
};

$newQuestionModalOpenBtn.onclick = () => openNewQuestionModal();
$newQuestionModalCloseBtn.onclick = () => closeNewQuestionModal();

const setNewQuestion = (name, value) => {
  newQuestion = { ...newQuestion, [name]: value };
};

$titleInputText.onkeyup = ({ target }) => {
  setNewQuestion(target.name, target.value);
};

$contentTextArea.onkeyup = ({ target }) => {
  setNewQuestion(target.name, target.value);
};

$newQuestionForm.onsubmit = e => {
  e.preventDefault();
  createQuestion();

  e.target.reset();
  closeNewQuestionModal();
};
