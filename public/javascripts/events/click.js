import { URL, FETCH_POST_OPTIONS } from "../constants.js";
import { fetchQuestionsAndAnswers } from "./DOMContentLoaded.js";
import { getDate } from "../utils.js";
import { getLoadingAnswerTpl } from "../templates.js";

export const toggleModal = (open = true) => {
  const modal = document.querySelector(".new-question-wrap");
  modal.style.display = open ? "block" : "none";
};

const getAnswerData = (target) => {
  const questionId = target.closest(".qna").getAttribute("_questionId");
  const content = target
    .closest(".answer-form")
    .querySelector(".answer-content-textarea").value;
  return {
    questionId,
    userId: 3,
    content,
    date: getDate(),
  };
};

const toggleLoading = (target, isLoading = true) => {
  const loadingTpl = getLoadingAnswerTpl();
  const answerUl = target.closest(".qna").querySelector(".answer");
  if (isLoading) {
    answerUl.innerHTML += loadingTpl;
  } else {
    answerUl.removeChild(answerUl.querySelector(".loading"));
  }
};

const handleSubmitNewAnswer = (target) => {
  const answerData = getAnswerData(target);
  toggleLoading(target);
  setTimeout(() => {
    fetch(URL.answers, {
      ...FETCH_POST_OPTIONS,
      body: JSON.stringify(answerData),
    })
      .then(async () => {
        await fetchQuestionsAndAnswers();
      })
      .catch((e) => alert(e))
      .finally(() => {
        toggleLoading(target, false);
      });
  }, 3000);
};

export const addClick = () => {
  document.addEventListener("click", (event) => {
    switch (event.target.className) {
      case "new-question-btn":
        return toggleModal(true);
      case "close-btn":
        return toggleModal(false);
      case "answer-submit":
        return handleSubmitNewAnswer(event.target);
    }
  });
};
