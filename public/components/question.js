import {getQnATemplate} from "../qna.js";
import {requestQuestions} from "../utils/api.js";

async function getQuestions() {
  try {
    return await requestQuestions();
  } catch (e) {
    console.error(e);
  }
}

function renderQuestions(questions =[]) {
  const questionWrapper = document.querySelector('.qna-wrap');
  const questionHTMLTemplate = getQnATemplate(questions);
  questionWrapper.insertAdjacentHTML('beforeend', questionHTMLTemplate);
}

export function getQuestionNodeByQuestionId(questionId) {
  return document.querySelector(`li[_questionid="${questionId}"] > ul.answer`);
}

export function getQuestionAnswerNodes() {
  return document.querySelectorAll('li.qna > .answer');
}

export async function loadQuestions() {
  const questions = await getQuestions();
  renderQuestions(questions);
}
