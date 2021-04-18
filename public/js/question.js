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
    questionData = await getUrlData(URL.questions);
    answerData = await getUrlData(URL.answers);

    drawList();
}

const drawList = () => {
    questionData.map(item => selectMatchedComments(item, answerData));

    document.querySelector(".qna-wrap").innerHTML = getQnATemplate(questionData);
}

const getUrlData = async (url) => {
    let res = await fetch(url);

    return res.json();
}


