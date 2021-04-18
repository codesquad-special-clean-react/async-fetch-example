import renderQnA from "../qna.js";
import { postAnswers } from "../service/api.js";

const $qnaWrap = document.querySelector(".qna-wrap");

let newAnswer = {
  questionId: 0,
  content: "",
  date: ""
};

const findQuestionId = target => {
  const currentEl = target.closest("li.qna");

  return Number(currentEl.getAttribute("_questionid"));
};

const generateDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return `${year}-${month}-${date}`;
};

const addNewAnswer = async () => {
  await postAnswers(newAnswer);
  await renderQnA();
};

$qnaWrap.onkeyup = ({ target }) => {
  if (!target.matches(".answer-content-textarea")) return;

  newAnswer = {
    ...newAnswer,
    content: target.value
  };
};

$qnaWrap.onclick = ({ target }) => {
  if (!target.matches(".answer-submit")) return;

  newAnswer = {
    ...newAnswer,
    questionId: findQuestionId(target),
    date: generateDate(),
    userId: 2
  };

  addNewAnswer();
};
