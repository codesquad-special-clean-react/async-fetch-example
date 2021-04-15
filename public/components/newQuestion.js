import {ID, moveToScrollBottom} from '../plain.js';
import {getRandomId} from '../utils/random.js';
import {renderQuestion} from './question.js';

const newQuestionWrapper = document.querySelector('div.main-wrap div.new-question-wrap');
const titleElement = document.getElementById('q-title');
const contentElement = document.getElementById('q-content');

function initializeForm() {
  titleElement.value = '';
  contentElement.value = '';
}


function isValidQuestion(title, question) {
  return title.trim() && question.trim()
}

export function addNewQuestion() {
  const title = titleElement.value;
  const question = contentElement.value;
  const userId = ID;
  const questionId = getRandomId();

  if (! isValidQuestion(title, question)) {
    alert('제목과 내용을 모두 입력해주세요.');
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
