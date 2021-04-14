import {getAnswerTemplate, getLoadingAnswerTpl} from "../qna.js";
import {requestAnswers} from "../utils/api.js";
import {getQuestionNodeByQuestionId, getQuestionAnswerNodes} from "./question.js";

const questionAnswerNodes = getQuestionAnswerNodes();
const questionLength = questionAnswerNodes.length;

async function getAnswers() {
  try {
    return await requestAnswers();
  } catch (e) {
    console.error(e);
  }
}

function renderLoadingUI() {
  const loadingHTMLTemplate = getLoadingAnswerTpl();

  for (let i = 0; i < questionLength; i += 1) {
    questionNodes[i].insertAdjacentHTML('beforeend', loadingHTMLTemplate);
  }
}

function removeLoadingUI() {
  for (let i = 0; i < questionLength; i += 1) {
    questionNodes[i].innerHTML = '';
  }
}

function renderAnswer(answer) {
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
  renderLoadingUI();
  const answers = await getAnswers();
  removeLoadingUI();
  renderAnswers(answers);
}
