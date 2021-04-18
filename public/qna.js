const PORT_NUMBER = 3004;

const URL = {
  questions: `http://localhost:${PORT_NUMBER}/questions`,
  answers: `http://localhost:${PORT_NUMBER}/answers`,
};

const qnaWrap = document.querySelector('.qna-wrap');
const newQuestionWrap = document.querySelector('.new-question-wrap');
const newQuestionOpenBtn = document.querySelector('.new-question-btn');
const newQuestionCloseBtn = document.querySelector('.close-btn');
const qTitle = document.querySelector('#q-title');
const qContent = document.querySelector('#q-content');
const qForm = document.querySelector('#new-q-form');

let QUESTION_CNT;
const CURRENT_USER_ID = 2;

const init = async () => {
  qnaWrap.innerHTML = getLoadingAnswerTpl();

  const answers = await fetch(URL.answers)
    .then((response) => response.json())
    .then((answers) => answers);
  const { questionsAndAnswers, count } = await fetch(URL.questions)
    .then((response) => response.json())
    .then((questions) => {
      return {
        questionsAndAnswers: questions.reduce((result, question) => {
          question.matchedComments = answers.filter(
            (answer) => answer.questionId === question.id
          );
          return [...result, question];
        }, []),
        count: questions.length,
      };
    });
  qnaWrap.innerHTML = getQnATemplate(questionsAndAnswers);
  QUESTION_CNT = count;
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

const handleNewQuestionBtnClick = () => {
  newQuestionWrap.classList.toggle('open');
};

const handleSubmitBtn = (evt) => {
  evt.preventDefault();
  if (qTitle.value !== '' && qContent.value !== '') {
    fetch(URL.questions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: qTitle.value,
        question: qContent.value,
        userId: CURRENT_USER_ID,
        id: QUESTION_CNT + 1,
      }),
    }).then((response) => response.ok && init());
  }
  qTitle.value = '';
  qContent.value = '';
  handleNewQuestionBtnClick();
};

document.addEventListener('DOMContentLoaded', () => {
  //코드시작
  init();
  newQuestionOpenBtn.addEventListener('click', handleNewQuestionBtnClick);
  newQuestionCloseBtn.addEventListener('click', handleNewQuestionBtnClick);
  qForm.addEventListener('submit', handleSubmitBtn);
});
