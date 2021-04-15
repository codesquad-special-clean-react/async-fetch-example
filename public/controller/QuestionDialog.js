export default class QuestionDialog {
  $newQuestionWrapper = document.querySelector('.new-question-wrap');
  $newQuestionForm = this.$newQuestionWrapper.querySelector('#new-q-form');

  open = () => {
    this.$newQuestionWrapper.style.display = 'block';
  };

  close = (e) => {
    this.$newQuestionWrapper.style.display = 'none';
  };
}
