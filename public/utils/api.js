import {URL} from '../qna.js';

async function getRequest(url) {
  const response = await fetch(url);
  const {status} = response;

  if (!status === 200) {
    throw new Error();
  }

  return await response.json();
}

export async function requestQuestions() {
  return await getRequest(URL.questions);
}

export async function requestAnswers() {
  return await getRequest(URL.answers);
}

export async function requestUsers() {
  const api = 'http://localhost:3001/users';
  return await getRequest(api);
}
