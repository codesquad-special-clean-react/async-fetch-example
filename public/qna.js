import { getAnswersMap } from "./javascripts/answers.js";

const URL = {
  questions: "http://localhost:3001/questions",
  answers: "http://localhost:3001/answers",
};

function getAnswerTemplate(answers) {
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
    );
  }, ``);
}

function getLoadingAnswerTpl() {
  return `<li class="answer-list loading" ">
        Loading.....
     </li>`;
}

function getQnATemplate(data) {
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
    );
  }, ``);
}

const getRequests = (URL) => {
  return Object.keys(URL)
    .sort()
    .map((key) => fetch(URL[key]));
};

const renderQna = ({ answers, questions }) => {
  const qnaWrap = document.querySelector(".qna-wrap");
  const answersMap = getAnswersMap(answers);
  const questionsWithComments = questions.map((question) => {
    if (answersMap[question.id]) {
      question.matchedComments = answersMap[question.id];
    }
    return question;
  });
  qnaWrap.innerHTML = getQnATemplate(questionsWithComments);
};

document.addEventListener("DOMContentLoaded", () => {
  //코드시작
  const requests = getRequests(URL);
  Promise.all(requests)
    .then(async ([answers, questions]) => [
      await answers.json(),
      await questions.json(),
    ])
    .then(([answers, questions]) => {
      renderQna({ answers, questions });
    });
});
