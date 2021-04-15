import { URL } from './constant.js'

export const getRequest = (URL) => {
  return Object.keys(URL).map((key) => fetch(URL[key]))
}

export const postQuestion = ({ title, question }) => {
  return postData(URL.questions, {
    title, question, 'userId': 1,
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

