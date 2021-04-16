const URL = {
    questions: 'http://localhost:3001/questions',
    answers: 'http://localhost:3001/answers',
};

export default {
    async getQuestions() {
        const response = await fetch(URL.questions);
        return await response.json();
    },
}
