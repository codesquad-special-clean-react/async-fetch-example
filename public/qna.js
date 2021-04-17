const URL = {
	questions: 'http://localhost:3001/questions',
	answers: 'http://localhost:3001/answers',
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

// 모달창질문 값 관리
const newQuestionContent = {
    title: '',
    content: '',
}

/** data fetching **/  

const QnAListsFetch = () => {
    return fetch(URL.questions).then((res) => res.json())
        .catch((error) => new Error(error));
}

const AnswerFetch = () => {
    return fetch(URL.answers).then((res) => res.json())
        .catch((error) => new Error(error));
}

const dataRender = () => {
    return Promise.all([QnAListsFetch(), AnswerFetch()])
        .catch((error) => new Error(error));
}

const modalFunction = () => {
    const newQuestion = document.getElementsByClassName('main-wrap')[0];
    newQuestion.addEventListener('click', (e) => {
        const dataset = e.target.dataset.action;

        if(dataset === undefined) return;

        if(dataset === 'new-question-addBtn') {
            document.getElementsByClassName('new-question-wrap')[0].style.display = 'block';
        }

        if(dataset === 'new-question-closeBtn') {
            document.getElementsByClassName('new-question-wrap')[0].style.display = 'none';
        }

        if(dataset === 'new-question-submit') {
            e.preventDefault();

            let _newQuestionContent;
            _newQuestionContent = {
                ...newQuestion,
                title: document.getElementById('q-title').value,
                content: document.getElementById('q-content').value,
            }
            newQuestionPost(_newQuestionContent);
        }
    })
}


document.addEventListener('DOMContentLoaded', async () => {
    //코드시작

    dataRender().then((res) => {
        // 왜 res[0]은 잘 들어가지는데 res[1]은 innerHTML null???
        document.querySelector('.qna-wrap').innerHTML = getQnATemplate(res[0]);
        document.querySelector('.answer').innerHTML = getAnswerTemplate(res[1]);
    })

    modalFunction();
});


