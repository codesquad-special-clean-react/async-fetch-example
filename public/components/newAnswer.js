import {ID} from "../plain.js";
import {getLoadingAnswerTpl} from "../qna.js";
import {requestAddNewAnswer} from "../utils/api.js";
import {getDate} from "../utils/date.js";
import {getRandomId} from "../utils/random.js";
import {renderAnswer} from './answer.js';


function getQuestionElement(questionId) {
  return document.querySelector(`li[_questionid="${questionId}"]`);
}

function isValidAnswer(answer) {
  return answer.trim();
}

function initTextArea(questionId) {
  const questionElement = getQuestionElement(questionId);
  const [questionTextAreaElement] = questionElement.getElementsByTagName('textarea')
  questionTextAreaElement.value = '';
}

function addLoadingUI(questionId) {
  const questionElement = getQuestionElement(questionId);
  const answerWrapper = questionElement.querySelector('.answer');
  const loadingTemplate = getLoadingAnswerTpl();

  answerWrapper.insertAdjacentHTML('beforeend', loadingTemplate);
}

function removeLoadingUI(questionId) {
  const questionElement = getQuestionElement(questionId);
  const answerWrapper = questionElement.querySelector('.answer');
  const loadingElement = questionElement.querySelector('.loading');
  answerWrapper.removeChild(loadingElement);
}

async function addNewAnswer(questionId, answer) {
  if (! isValidAnswer(answer)) {
    alert('답변을 입력해주세요.');
    return;
  }

  initTextArea(questionId);
  addLoadingUI(questionId);
  await requestAddNewAnswer(answer);
  const id = getRandomId();
  const userId = ID;
  const content = answer;
  const date = getDate();
  renderAnswer({
    questionId,
    id,
    userId,
    content,
    date
  });
  removeLoadingUI(questionId);
}

export function handleAddNewAnswerButtonClick({target}) {
  if (!target.classList.contains('answer-submit')) {
    return;
  }

  const questionElement = target.closest('li');
  const [answerTextAreaElement] = questionElement.getElementsByTagName('textarea');
  const answer = answerTextAreaElement.value;
  const questionId = questionElement.getAttribute('_questionid');

  addNewAnswer(questionId, answer);
}
