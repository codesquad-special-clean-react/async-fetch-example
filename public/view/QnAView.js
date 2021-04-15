class QnAView {
  $qnaList = document.querySelector('.qna-wrap');
  $newQuestionButton = document.querySelector('.new-question-btn');

  constructor(initialState) {
    this.state = initialState;
  }

  render = (data) => {
    this.$qnaList.innerHTML = this.getQnATemplate(data);
  };

  setViewState(newState) {
    console.warn('view set!');
    if (typeof newState === 'function') this.state = newState(this.state);
    else this.state = { ...this.state, ...newState };
    this.render(this.state.data);
  }

  getLoadingAnswerTpl() {
    return `<li class="answer-list loading" ">
          Loading.....
       </li>`;
  }

  getAnswerTemplate(answers) {
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

  getQnATemplate(data) {
    return data.reduce(
      (html, { title, question, id, matchedComments = [] }) => {
        return (
          html +
          `
                <li class="qna" _questionId=${+id}>
                    <div class="qna-title">
                        <h2>${title}</h2>
                    </div>
                    <div class="question">
                        <p> ${question}</p>
                    </div>
                    <ul class="answer">${this.getAnswerTemplate(
                      matchedComments
                    )}</ul>
                    <div class="answer-form">
                        <form method="POST">
                            <textarea name="answer-content" class="answer-content-textarea" cols="30" rows="2" placeholder="새로운답변.."></textarea>
                            <button type="submit" class="answer-submit">등록</button>
                        </form>
                    </div>
                </li>
            `
        );
      },
      ``
    );
  }
}

export default QnAView;
