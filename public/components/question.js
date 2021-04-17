import {getQnATemplate} from "../qna.js";
import {requestQuestions} from "../utils/api.js";

const questionWrapper = document.querySelector('.qna-wrap');

async function getQuestions() {
  try {
    return await requestQuestions();
  } catch (e) {
    console.error(e);
  }
}

export function renderQuestion(question) {
  const questionHTMLTemplate = getQnATemplate([question]);
  questionWrapper.insertAdjacentHTML('beforeend', questionHTMLTemplate);
}

function renderQuestions(questions =[]) {
  const questionLength = questions.length;

  for (let i = 0; i < questionLength; i += 1) {
    renderQuestion(questions[i]);
  }

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
