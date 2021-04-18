const loadingTime = 3_000;

const selectMatchedComments = (item, answers) => {
    item.matchedComments = answers.filter(answer => {
        return Number(answer.questionId) === Number(item.id);
    });
}

const getLoadingAnswerTpl = (comments, questionId) => {
    const loadingHtml = `<li class="answer-list loading" ">
                            Loading.....
                         </li>`;

    getAnswer(comments, questionId);

    return loadingHtml;
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
    console.log("answers",answers)
    const $answerUl = document.querySelector(`ul.answer[data-qIdx="${questionId}"]`);

    if (answers.length === 0) $answerUl.innerHTML = ``;
    const commentHtml = answers.reduce((html, {id, content, userId, date}) => {
        return (
            html +
            `<li class="answer-list" _answerId="${id}">
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

const addAnswer = () => {
    const $answerSubmit = document.querySelectorAll(".answer-submit");

    Array.from($answerSubmit).map(item => {
        item.addEventListener("click", ({target}) => {
            const questionId = target.closest("li.qna").getAttribute("_questionId");
            const $answerTextarea = target.closest("div.answer-form").querySelector("form textarea");

            answerData.push({
                content: $answerTextarea.value,
                date: getToday(),
                id: (answerData.length + 2),
                questionId: questionId,
                userId: 1
            });

            const matchedComment = answerData.filter(item => {
                return item.questionId == questionId;
            })

            getAnswerTemplate(matchedComment, questionId);
        })
    });

}