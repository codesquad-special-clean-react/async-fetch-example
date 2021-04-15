import {openNewQuestionModal, closeNewQuestionModal} from './components/newQuestion.js';
import {addNewQuestion} from './components/newQuestion.js'


function handleClickEvent({target}) {
  if (target.classList.contains('new-question-btn')) {
    openNewQuestionModal();
    return;
  }

  if (target.classList.contains('close-btn')) {
    closeNewQuestionModal();
    return;
  }

  if (target.classList.contains('answer-submit')) {
    addNewQuestion();
    return;
  }

  if (target.type === 'submit') {
    addNewQuestion();
  }
}

export function addEvents() {
  const mainWrapper = document.querySelector('div.main-wrap');

  mainWrapper.addEventListener('click', handleClickEvent);
}

export function preventSubmitEvent() {
  const submitElement = document.getElementById('new-q-form');
  submitElement.addEventListener('submit', (e) => e.preventDefault());
}

export function moveToScrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}
