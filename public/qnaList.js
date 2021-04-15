const URL = {
    questions: 'http://localhost:3001/questions',
    answers: 'http://localhost:3001/answers',
};

function getAnswerTemplate(answers) {
    console.log("answers ", answers);
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
    console.log("## data ", data)

    return data.reduce((html, { title, question, id, matchedComments = [] }) => {
        console.log("title ", title)
        console.log("matchedComments ", matchedComments)

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


async function makeQuestionList () {
    const qData = await getData(URL.questions);
    const aData = await getData(URL.answers);

    qData.map(item => {
        const questionAns = aData.filter(answer => {
            return Number(answer.questionId) === Number(item.id);
        });

        item.matchedComments = questionAns;
    });

    document.querySelector(".qna-wrap").innerHTML = getQnATemplate(qData);
}


async function getData (url) {
    let res = await fetch(url);

    return res.json();
}

