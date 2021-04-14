import api from "./utils/api.js";
import getQnATemplate from "./components/Qna.js";

const qnaWrap = document.querySelector(".qna-wrap");

const setQnATemplate = async () => {
  const questions = await api.getQuestionsAndAnswers();
  qnaWrap.innerHTML = await getQnATemplate(questions);
};

const init = () => {
  setQnATemplate();
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
