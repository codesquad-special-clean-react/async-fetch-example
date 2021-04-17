const URL = {
    questions: 'http://localhost:3001/questions',
    answers: 'http://localhost:3001/answers',
};

async function get(url) {
    const response = await fetch(url);
    return await response.json();
}

async function post(url, data) {
    const response = await fetch(URL.questions, {
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

    async createQuestion({userId = 2, title, question}) {
        await post(URL.questions, {userId, title, question});
    },

    async getAnswers() {
        return await get(URL.answers);
    },
};
