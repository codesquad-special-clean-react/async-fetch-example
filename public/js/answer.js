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

const selectMatchedComments = (item, answers) => {
    item.matchedComments = answers.filter(answer => {
        return Number(answer.questionId) === Number(item.id);
    });
}