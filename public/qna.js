import getQnATemplate from "./components/Question.js";
import matchedQuestionAnswer from "./utils/utils.js";

const renderQnA = async () => {
  const $qnaWrap = document.querySelector(".qna-wrap");
  const data = await matchedQuestionAnswer();

  $qnaWrap.innerHTML = getQnATemplate(data);
};

document.addEventListener("DOMContentLoaded", () => {
  renderQnA();
});
