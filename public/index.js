import api from "./utils/api.js";
import getQnATemplate from "./components/Qna.js";
import Modal from "./components/Modal.js";

const qnaWrap = document.querySelector(".qna-wrap");
const newQuestionBtn = document.querySelector(".new-question-btn");
const newQuestionWrap = document.querySelector(".new-question-wrap");
const newQuestionSubmitBtn = document.querySelector(".new-question-submit-btn");
const closeBtn = document.querySelector(".close-btn");

const setQnATemplate = async () => {
  const questions = await api.getQuestionsAndAnswers();
  qnaWrap.innerHTML = await getQnATemplate(questions);
};

const init = () => {
  setQnATemplate();
};

newQuestionBtn.addEventListener("click", () => {
  Modal(newQuestionWrap);
});

closeBtn.addEventListener("click", () => {
  Modal(newQuestionWrap);
});

newQuestionSubmitBtn.addEventListener("click", () => {
  init();
});

document.addEventListener("DOMContentLoaded", () => {
  init();
});
