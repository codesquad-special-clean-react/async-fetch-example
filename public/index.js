import api from "./utils/api.js";
import getQnATemplate from "./components/Qna.js";
import toggleModal from "./components/Modal.js";
import addLoader from "./components/Loader.js";

const qnaWrap = document.querySelector(".qna-wrap");
const newQuestionBtn = document.querySelector(".new-question-btn");
const newQuestionWrap = document.querySelector(".new-question-wrap");
const newQuestionSubmitBtn = document.querySelector(".new-question-submit-btn");
const closeBtn = document.querySelector(".close-btn");

const setQnATemplate = async () => {
  const questions = await api.getQuestionsAndAnswers();
  qnaWrap.innerHTML = getQnATemplate(questions);
};

const init = () => {
  setQnATemplate();
};

const findAnswerData = (el) => {
  const questionId = el.closest("li").dataset.questionId;
  const answerForm = el.closest(".answer-form");
  const content = answerForm.querySelector(".answer-content-textarea").value;
  const date = new Date().toISOString().slice(0, 10);
  return {
    questionId: +questionId,
    content: content,
    date: date,
    userId: 1,
  };
};

const postAnswerData = async (e) => {
  const el = e.target;
  const flag = el.classList.contains("answer-submit");
  const ulFlag = el.closest("ul");
  if (!flag || !ulFlag) {
    return;
  }
  const data = findAnswerData(el);
  await api.postAnswer(data);
  await init();
};

const postQuestionData = async () => {
  const questionTitle = document.querySelector("#q-title");
  const questionContent = document.querySelector("#q-content");
  const data = {
    title: questionTitle.value,
    question: questionContent.value,
    userId: 2,
  };
  await api.postQuestion(data);
  await setQnATemplate();
  questionTitle.value = "";
  questionContent.value = "";
};

newQuestionBtn.addEventListener("click", () => toggleModal(newQuestionWrap));

closeBtn.addEventListener("click", () => toggleModal(newQuestionWrap));

qnaWrap.addEventListener("click", (e) => postAnswerData(e));

newQuestionSubmitBtn.addEventListener("click", async () => {
  await postQuestionData();
  toggleModal(newQuestionWrap);
});

document.addEventListener("DOMContentLoaded", () => {
  init();
});
