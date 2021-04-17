import { getRequest } from '../utils/api.js'
import { getQnATemplate } from '../utils/template.js'
import { URL } from '../utils/constant.js'
import { selector, allSelector } from '../utils/util.js'
import Question from './Question.js'
import Comment from './Comment.js'

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
    this.$newQnABtn = selector('.new-question-btn')
    new Question(selector('.new-question-wrap'), render)
    new Comment(allSelector('.qna'), render)
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
    const qnaWrap = selector('.qna-wrap')
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
