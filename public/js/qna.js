const URL = {
	questions: 'http://localhost:3001/questions',
	answers: 'http://localhost:3001/answers',
};

let questionData = [];
let answerData = [];

document.addEventListener('DOMContentLoaded', () => {
	//코드시작
	makeQuestionList();

	newQuestionModal();
});
