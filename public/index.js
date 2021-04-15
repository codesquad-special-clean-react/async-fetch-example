import api from "./utils/api.js";
import getQnATemplate from "./components/Qna.js";
import toggleModal from "./components/Modal.js";

const qnaWrap = document.querySelector(".qna-wrap");
const newQuestionBtn = document.querySelector(".new-question-btn");
const newQuestionWrap = document.querySelector(".new-question-wrap");
// const newQuestionSubmitBtn = document.querySelector(".new-question-submit-btn");
const closeBtn = document.querySelector(".close-btn");

const setQnATemplate = async () => {
  const questions = await api.getQuestionsAndAnswers();
  qnaWrap.innerHTML = await getQnATemplate(questions);
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
  if (!flag) {
    return;
  }
  const data = await findAnswerData(el);
  await api.postAnswer(data);
};

newQuestionBtn.addEventListener("click", () => toggleModal(newQuestionWrap));

closeBtn.addEventListener("click", () => toggleModal(newQuestionWrap));

qnaWrap.addEventListener("click", (e) => postAnswerData(e));

// newQuestionSubmitBtn.addEventListener("click", () => {
//   console.log(1);
//   // init();
// });

document.addEventListener("DOMContentLoaded", () => {
  init();
});
