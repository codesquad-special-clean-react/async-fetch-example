const URL = {
    questions: 'http://localhost:3001/questions',
    answers: 'http://localhost:3001/answers',
};

const defaultApis = {
    async get(url) {
        const response = await fetch(url);
        return await response.json();
    },
}

export default {
    async getQuestions() {
        return await defaultApis.get(URL.questions);
    },

    async getAnswers() {
        return await defaultApis.get(URL.answers);
    }
}
