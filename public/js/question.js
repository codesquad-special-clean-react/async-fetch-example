const getQnATemplate = (data) => {
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

 const makeQuestionList = async () => {
    const questions = await getUrlData(URL.questions);
    const answers = await getUrlData(URL.answers);

    questions.map(item => selectMatchedComments(item, answers));

    document.querySelector(".qna-wrap").innerHTML = getQnATemplate(questions);
}


const getUrlData = async (url) => {
    let res = await fetch(url);

    return res.json();
}

