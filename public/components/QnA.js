import { getRequest } from '../util/api.js'
import { getQnATemplate } from '../util/template.js'
import { URL } from '../util/constant.js'
import $ from '../util/querySelector.js'

class QnA {
  constructor () {
    this.init()
  }

  init () {
    this._contentLoading();
  }

  _contentLoading(){
    const requests = getRequest(URL)
    Promise.all(requests)
      .then(response => Promise.all(response.map((r, num) => r.json())))
      .then((result) => {
        const [questions, answers] = result
        this._renderQna({ questions, answers })
      })
  }

  _getAnswersMap(answers){
    return answers.reduce((acc, answer) => {
      if (!acc[answer.questionId]) {
        acc[answer.questionId] = []
      }
      acc[answer.questionId].push(answer)
      return acc
    }, {})
  }

  _renderQna({ answers, questions }){
    const qnaWrap = $('.qna-wrap')
    const answersMap = this._getAnswersMap(answers)
    const questionsWithComments = questions.map((question) => {
      if (answersMap[question.id]) {
        question.matchedComments = answersMap[question.id]
      }
      return question
    })
    qnaWrap.innerHTML = getQnATemplate(questionsWithComments)
  }
}

export default QnA
