export default class QuestionDialog {
  _$newQuestionWrapper = document.querySelector('.new-question-wrap');
  $newQuestionForm = this._$newQuestionWrapper.querySelector('#new-q-form');
  $newQuestionCloseBtn = this._$newQuestionWrapper.querySelector('.close-btn');
  isOpen = false;

  constructor() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._$newQuestionWrapper.style.display = 'block';
    this.isOpen = true;
  }

  close() {
    this._$newQuestionWrapper.style.display = 'none';
    this.isOpen = false;
  }
}
