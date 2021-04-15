import {moveToScrollBottom} from '../plain.js';
import {renderQuestion} from './question.js';

const newQuestionWrapper = document.querySelector('div.main-wrap div.new-question-wrap');
const titleElement = document.getElementById('q-title');
const contentElement = document.getElementById('q-content');

function initializeForm() {
  titleElement.value = '';
  contentElement.value = '';
}

function getRandomNumber() {
  return parseInt(Math.random() * 1000000, 10) + 20;
}

function isValidQuestion(title, question) {
  if (title.trim() && question.trim()) {
    return true;
  }


  alert('제목과 내용을 모두 입력해주세요.');
  return false;
}

export function addNewQuestion() {
  const title = titleElement.value;
  const question = contentElement.value;
  const userId = 'USER_ID';
  const questionId = getRandomNumber();

  if (! isValidQuestion(title, question)) {
    return;
  }


  renderQuestion({title, question, userId, id: questionId});
  closeNewQuestionModal();
  moveToScrollBottom();
}

export function openNewQuestionModal() {
  initializeForm();
  newQuestionWrapper.style.display = 'block';
}

export function closeNewQuestionModal() {
  newQuestionWrapper.style.display = 'none';
}
