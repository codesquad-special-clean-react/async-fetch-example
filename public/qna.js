import getQnATemplate from "./components/Question.js";
import getData from "./utils/utils.js";

const renderQnA = async () => {
  const $qnaWrap = document.querySelector(".qna-wrap");

  const data = await getData();

  $qnaWrap.innerHTML = getQnATemplate(data);
};

document.addEventListener("DOMContentLoaded", () => {
  renderQnA();
});
