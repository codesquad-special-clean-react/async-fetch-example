const loadingTime = 3_000;

const selectMatchedComments = (item, answers) => {
    item.matchedComments = answers.filter(answer => {
        return Number(answer.questionId) === Number(item.id);
    });
}

const getLoadingAnswerTpl = (comments, questionId) => {
    getAnswer(comments, questionId);

    return `<li class="answer-list loading" ">
        Loading.....
     </li>`;
}

const getAnswer = (answers, questionId) => {
    new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve();
        }, loadingTime);
    }).then(function (result) {
        getAnswerTemplate(answers, questionId);
    });
}

const getAnswerTemplate = (answers, questionId) => {
    const $answerUl = document.querySelector(`ul.answer[data-qIdx="${questionId}"]`);

    if (answers.length === 0) $answerUl.innerHTML = ``;

    const commentHtml = answers.reduce((html, {content, userId, date}) => {
        return (
            html +
            `<li class="answer-list" ">
                <p class="answer-content">${content}</p>
                <div class="answer-profile">
                    <span class="answer-writer">${userId} | </span>
                    <span class="answer-date">${date}</span>
                </div>
            </li>`
        );
    }, ``);

    $answerUl.innerHTML = commentHtml;
}