import { getRequest } from './util/api.js'
import { URL } from './util/constant.js'
import $ from './util/querySelector.js'

function getAnswerTemplate (answers) {
  return answers.reduce((html, { content, userId, date }) => {
    return (
      html +
      `
        <li class="answer-list" ">
            <p class="answer-content">${content}</p>
            <div class="answer-profile">
                <span class="answer-writer">${userId} | </span>
                <span class="answer-date">${date}</span>
            </div>
        </li>`
    )
  }, ``)
}

function getLoadingAnswerTpl () {
  return `<li class="answer-list loading" ">
        Loading.....
     </li>`
}

function getQnATemplate (data) {
  return data.reduce((html, { title, question, id, matchedComments = [] }) => {
    return (
      html +
      ` <li class="qna" _questionId=${+id}>
        <div class="qna-title">
            <h2>${title}</h2>
        </div>
        <div class="question">
            <p> ${question}</p>
        </div>
        <ul class="answer">${getAnswerTemplate(matchedComments)}</ul>
        <div class="answer-form">
            <form method="POST">
                <textarea name="answer-content" class="answer-content-textarea" cols="30" rows="2" placeholder="새로운답변.."></textarea>
            </form>
            <button class="answer-submit">등록</button>
        </div>
    </li>`
    )
  }, ``)
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
export const getAnswersMap = (answers) => {
  return answers.reduce((acc, answer) => {
    if (!acc[answer.questionId]) {
      acc[answer.questionId] = []
    }
    acc[answer.questionId].push(answer)
    return acc
  }, {})
}

export const renderQna = ({ answers, questions }) => {
  const qnaWrap = $('.qna-wrap')
  const answersMap = getAnswersMap(answers)
  const questionsWithComments = questions.map((question) => {
    if (answersMap[question.id]) {
      question.matchedComments = answersMap[question.id]
    }
    return question
  })
  qnaWrap.innerHTML = getQnATemplate(questionsWithComments)
}

document.addEventListener('DOMContentLoaded', () => {
  //코드시작
  contentLoading()
})
