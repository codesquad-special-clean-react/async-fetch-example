const URL = {
    questions: 'http://localhost:3001/questions',
    answers: 'http://localhost:3001/answers',
};

async function get(url) {
    const response = await fetch(url);
    return await response.json();
}

async function post(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export default {
    async getQuestions() {
        return await get(URL.questions);
    },

    async createQuestion({userId, title, question}) {
        return await post(URL.questions, {userId, title, question});
    },

    async getAnswers() {
        return await get(URL.answers);
    },

    async createAnswer({userId, questionId, content, date}) {
        return await post(URL.answers, {userId, questionId, content, date});
    },
};

