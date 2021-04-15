import {handleAddNewAnswerButtonClick} from './components/newAnswer.js';
import {openNewQuestionModal, closeNewQuestionModal} from './components/newQuestion.js';
import {addNewQuestion} from './components/newQuestion.js'

export const ID = "SUMIN";

export function addEvents() {
  const [newQuestionButton] = document.getElementsByClassName('new-question-btn');
  const [closeButton] = document.getElementsByClassName('close-btn');
  const [qnaWrapper] = document.getElementsByClassName('qna-wrap')
  const addNewQuestionButton = document.getElementById('new-q-form').querySelector('button');

  newQuestionButton.addEventListener('click', openNewQuestionModal);
  closeButton.addEventListener('click', closeNewQuestionModal);
  qnaWrapper.addEventListener('click', handleAddNewAnswerButtonClick);
  addNewQuestionButton.addEventListener('click', addNewQuestion);
}

export function preventSubmitEvent() {
  const submitElement = document.getElementById('new-q-form');
  submitElement.addEventListener('submit', (e) => e.preventDefault());
}

export function moveToScrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}
