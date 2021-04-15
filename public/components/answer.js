import {getAnswerTemplate, getLoadingAnswerTpl} from "../qna.js";
import {requestAnswers} from "../utils/api.js";
import {getQuestionNodeByQuestionId, getQuestionAnswerNodes} from "./question.js";

async function getAnswers() {
  try {
    return await requestAnswers();
  } catch (e) {
    console.error(e);
  }
}

export function renderAnswer(answer) {
  const {questionId} = answer;

  const answerHTMLTemplate = getAnswerTemplate([answer]);
  const questionNode = getQuestionNodeByQuestionId(questionId);

  questionNode.insertAdjacentHTML('beforeend', answerHTMLTemplate);
}

function renderAnswers(answers =[]) {
  const answerLength = answers.length;

  for (let i = 0; i < answerLength; i += 1) {
    renderAnswer(answers[i]);
  }
}

export async function loadAnswers() {
  const answers = await getAnswers();
  renderAnswers(answers);
}
