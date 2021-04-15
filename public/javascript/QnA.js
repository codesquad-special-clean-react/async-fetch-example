import { getRequest, postComment } from '../utils/api.js'
import { getLoadingAnswerTpl, getQnATemplate } from '../utils/template.js'
import { URL } from '../utils/constant.js'
import { delay, sel, selAll } from '../utils/util.js'
import NewQuestion from './NewQuestion.js'

export default function QnA () {

  const init = async () => {
    await render()
    new NewQuestion(sel('.new-question-wrap'), render)
  }

  const render = async () => {
    const [questions, answers] = await contentLoading()
    renderQna({ questions, answers })
    addDomEvent()
  }

  const addDomEvent = () => {
    this.$newQnABtn = sel('.new-question-btn')
    this.$newQnAModal = sel('.new-question-wrap')
    this.$qnaList = selAll('.qna')
    this.$newQnABtn.addEventListener('click', openModal)
    this.$qnaList.forEach(($qna) => {
      $qna.addEventListener('click', addComment)
    })
  }

  const addComment = async (e) => {
    const {target, currentTarget} = e;
    if(isValidAction(target)) return;
    const questionId = currentTarget.getAttribute("_questionId");
    const content = sel('.answer-content-textarea', target.closest('.answer-form')).value;
    sel('ul.answer', currentTarget).insertAdjacentHTML('beforeend', getLoadingAnswerTpl());
    sel('.answer-content-textarea', target.closest('.answer-form')).value = '';
    await delay(3000)
    try {
      const response = await postComment({questionId, content})
      if(response.ok) {
        await render();
      }
    } catch (err) {
      console.error('addComment Error', err)
    }

  }

  const isValidAction = (target) => {
    const isAddCommentBtn = target.classList.contains('answer-submit')
    if (isAddCommentBtn === false ) return true;
    const commentValue = sel('.answer-content-textarea', target.closest('.answer-form')).value;
    return commentValue.length === 0;
  }


  const openModal = () => {
    this.$newQnAModal.style.display = 'block'
  }

  const contentLoading = () => {
    const requests = getRequest(URL)
    return Promise.all(requests)
      .then(response => Promise.all(response.map((r, num) => r.json())))
      .then((result) => result)
  }

  const getAnswersMap = (answers) => {
    return answers.reduce((acc, answer) => {
      if (!acc[answer.questionId]) {
        acc[answer.questionId] = []
      }
      acc[answer.questionId].push(answer)
      return acc
    }, {})
  }

  const renderQna = ({ answers, questions }) => {
    const qnaWrap = sel('.qna-wrap')
    const answersMap = getAnswersMap(answers)
    const questionsWithComments = questions.map((question) => {
      if (answersMap[question.id]) {
        question.matchedComments = answersMap[question.id]
      }
      return question
    })
    qnaWrap.innerHTML = getQnATemplate(questionsWithComments)
  }

  init()
}
