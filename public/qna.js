import getQnATemplate from "./components/Question.js";
import fetchQnAData from "./utils/fetchQnAData.js";

const renderQnA = async () => {
  const $qnaWrap = document.querySelector(".qna-wrap");
  const data = await fetchQnAData();

  $qnaWrap.innerHTML = getQnATemplate(data);
};

document.addEventListener("DOMContentLoaded", () => {
  renderQnA();
});

export default renderQnA;
