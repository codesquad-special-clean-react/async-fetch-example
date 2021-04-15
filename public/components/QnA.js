import { getRequest } from '../util/api.js'
import { getQnATemplate } from '../util/template.js'
import { URL } from '../util/constant.js'
import sel from '../util/querySelector.js'
import NewQuestion from './NewQuestion.js'

export default function QnA () {
  this.$newQnABtn = sel('.new-question-btn')
  this.$newQnAModal = sel('.new-question-wrap')

  const init = () => {
    contentLoading()
    addDomEvent()
    new NewQuestion(sel('.new-question-wrap'), contentLoading)
  }

  const addDomEvent = () => {
    this.$newQnABtn.addEventListener('click', openModal)
  }

  const openModal = () => {
    this.$newQnAModal.style.display = 'block'
  }

  const contentLoading = () => {
    const requests = getRequest(URL)
    Promise.all(requests)
      .then(response => Promise.all(response.map((r, num) => r.json())))
      .then((result) => {
        const [questions, answers] = result
        renderQna({ questions, answers })
      })
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
