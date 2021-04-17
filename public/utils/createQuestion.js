const $newQuestionModalOpenBtn = document.querySelector(".new-question-btn");
const $newQuestionModal = document.querySelector(".new-question-wrap");
const $newQuestionModalCloseBtn = document.querySelector(
  ".new-question-wrap > .close-btn"
);
const $titleInputText = document.querySelector("#q-title");
const $contentTextArea = document.querySelector("#q-content");
const $newQuestionForm = document.querySelector("#new-q-form");
// const $newQuestionBtn = document.querySelector(".new-question-wrap > button");

let newQuestion = {
  title: "",
  question: ""
};

// console.log(generateId());
const createQuestion = () => {
  newQuestion = { ...newQuestion, userId: 2 };
  console.log(newQuestion);
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
  //   console.log(name, value);
  newQuestion = { ...newQuestion, [name]: value };

  //   console.log(newQuestion);
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
