const URL = {
  questions: "http://localhost:3001/questions",
  answers: "http://localhost:3001/answers",
};
const QNADom = document.querySelector(".qna-wrap");

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

function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(`fetch error: ${error}`));
}

function makeNewQuestion(questions, answers) {
  return questions.map((question) => {
    const answer = answers.filter(
      (answer) => answer.questionId === question.id
    );

    return {
      ...question,
      matchedComments: answer,
    };
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  //코드시작
  const questions = await fetchData(URL.questions);
  const answers = await fetchData(URL.answers);
  const newQuestion = makeNewQuestion(questions, answers);

  const QnATemplate = getQnATemplate(newQuestion);
  QNADom.innerHTML = QnATemplate;
});
