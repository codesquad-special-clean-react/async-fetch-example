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

  // subscription은 모델이 가져야할 메서드가 맞는거같은데,,
  // 그럼 데이터를 수정하는 건 controller, model? 누가 제공해야하나.
  // 그것도 일일이 메서드로 만들어야하나
  // dispatch... flux 패턴이 이래서 필요한것이엇나,,난 OOP도 FP도 몰라,,,

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

    // loading
    // this.view.getLoadingAnswerTpl();
    await this.model.addAnswer({ content, questionId, date });
    // end loading
    // maybe by state mgmt?
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
