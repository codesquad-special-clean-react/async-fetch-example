import { URL } from './constant.js'
import { getNowDate } from './util.js'

export const getRequest = (URL) => {
  return Object.keys(URL).map((key) => fetch(URL[key]))
}

export const postQuestion = ({ title, question }) => {
  return postData(URL.questions, {
    title, question, 'userId': 1,
  })
}

export const postComment = ({ questionId, content }) => {
  return postData(URL.answers, {
    questionId,
    "userId": 1,
    content,
    "date": getNowDate()
  })
}

function postData (url = '', data = {}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

