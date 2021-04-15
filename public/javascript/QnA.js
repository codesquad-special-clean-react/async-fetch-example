import { getRequest } from '../utils/api.js'
import { getQnATemplate } from '../utils/template.js'
import { URL } from '../utils/constant.js'
import { sel, selAll } from '../utils/util.js'
import NewQuestion from './NewQuestion.js'
import NewComment from './NewComment.js'

export default function QnA () {

  const init = async () => {
    await render()
  }

  const render = async () => {
    const [questions, answers] = await contentLoading()
    renderQna({ questions, answers })
    addDomEvent()
  }

  const addDomEvent = () => {
    this.$newQnABtn = sel('.new-question-btn')
    this.$newQnAModal = sel('.new-question-wrap')
    this.$newQnABtn.addEventListener('click', openModal)
    new NewQuestion(sel('.new-question-wrap'), render)
    new NewComment(selAll('.qna'), render)
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
