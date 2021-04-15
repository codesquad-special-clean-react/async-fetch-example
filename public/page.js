export default class Page {
  constructor(fetch, baseDOM) {
    this.URL = {
      questions: "http://localhost:3001/questions",
      answers: "http://localhost:3001/answers",
    };

    this.QNADom = baseDOM;

    this.fetch = fetch;
  }

  // getData and Parsing
  async getQNAPage() {
    const newQuestion = await this._getData();
    this._renderView(this.QNADom, newQuestion);
  }

  async _getData() {
    const questions = await this.fetch.getData(this.URL.questions);
    const answers = await this.fetch.getData(this.URL.answers);
    const newQuestion = this._makeNewQuestion(questions, answers);
    return newQuestion;
  }

  _makeNewQuestion(questions, answers) {
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

  // render Page
  _renderView(baseDOM, newQuestion) {
    const QnATemplate = this._getQnATemplate(newQuestion);
    baseDOM.innerHTML = QnATemplate;
  }

  _getAnswerTemplate(answers) {
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

  _getLoadingAnswerTpl() {
    return `<li class="answer-list loading" ">
          Loading.....
       </li>`;
  }

  _getQnATemplate(data) {
    return data.reduce(
      (html, { title, question, id, matchedComments = [] }) => {
        return (
          html +
          ` <li class="qna" _questionId=${+id}>
          <div class="qna-title">
              <h2>${title}</h2>
          </div>
          <div class="question">
              <p> ${question}</p>
          </div>
          <ul class="answer">${this._getAnswerTemplate(matchedComments)}</ul>
          <div class="answer-form">
              <form method="POST">
                  <textarea name="answer-content" class="answer-content-textarea" cols="30" rows="2" placeholder="새로운답변.."></textarea>
              </form>
              <button class="answer-submit">등록</button>
          </div>
      </li>`
        );
      },
      ``
    );
  }
}
