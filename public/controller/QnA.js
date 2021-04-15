import QnAModel from '../model/QnAModel.js';
import QnAView from '../view/QnAView.js';
import QuestionDialogView from './QuestionDialog.js';
import Utils from '../utils.js';

class QnA {
  model = new QnAModel();
  view = new QnAView(this.model.state);
  dialogView = new QuestionDialogView();
  _utils = Utils;

  constructor() {
    this.model.subscribe(() => this.view.setViewState(this.model.state));
    this.addListeners();
  }

  onQuestionSubmit = async (e) => {
    e.preventDefault();
    const { target: $form } = e;
    const questionData = this._utils.processFormToObject($form);
    await this.model.addQuestion(questionData);
    this.dialogView.close(e);
  };

  onAnswerSubmit = async (e) => {
    e.preventDefault();
    const { target: $form } = e;

    const { 'answer-content': content } = this._utils.processFormToObject(
      $form
    );
    const questionId = +e.target.closest('li').getAttribute('_questionid');
    const date = new Date().toISOString().slice(0, 10);

    await this.model.addAnswer({ content, questionId, date });
  };

  onClose = (e) => {
    if (!e.target.matches('.close-btn')) return;
    this.dialogView.close();
  };

  addListeners() {
    const {
      view: { $newQuestionButton, $qnaList },
      dialogView: { $newQuestionForm, $newQuestionWrapper },
    } = this;

    $qnaList.addEventListener('submit', this.onAnswerSubmit);
    $newQuestionButton.addEventListener('click', this.dialogView.open);

    $newQuestionForm.addEventListener('submit', this.onQuestionSubmit);
    $newQuestionWrapper.addEventListener('click', this.onClose);
  }
}

export default QnA;
