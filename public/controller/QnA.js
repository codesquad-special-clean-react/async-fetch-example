import QnAModel from '../model/QnAModel.js';
import QnAView from '../view/QnAView.js';
import QuestionDialogView from './QuestionDialog.js';

class QnA {
  model = new QnAModel();
  view = new QnAView(this.model.state);
  dialogView = new QuestionDialogView();

  constructor() {
    this.model.subscribe(() => this.view.setViewState(this.model.state));
    this.addListeners();
  }

  // subscription은 모델이 가져야할 메서드가 맞는거같은데,,
  // 그럼 데이터를 수정하는 건 controller, model? 누가 제공해야하나.
  // 그것도 일일이 메서드로 만들어야하나
  // dispatch... flux 패턴이 이래서 필요한것이엇나,,난 OOP도 FP도 몰라,,,

  onSubmit = async (e) => {
    e.preventDefault();
    const $form = e.target;
    await this.model.addNewQuestion($form);
    this.dialogView.close();
  };

  addListeners() {
    const {
      view: { $newQuestionButton },
      dialogView: { $newQuestionForm, $newQuestionCloseBtn },
    } = this;

    $newQuestionButton.addEventListener('click', this.dialogView.open);

    $newQuestionForm.addEventListener('submit', this.onSubmit);
    $newQuestionCloseBtn.addEventListener('click', this.close);
  }
}

export default QnA;
