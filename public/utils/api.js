const API_ENDPOINT = "http://localhost:3001";
const URL = {
  QUESTIOMS: "/questions",
  ANSWERS: "/answers",
  USERS: "/users",
};

const postMessageForm = (data) => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const request = async (url, message = null) => {
  const res = await fetch(url, message);
  const flag = res.ok;
  const data = res.json();
  if (!flag) {
    throw data;
  }
  return data;
};

const findQuestionMatchedAnswer = (answers, questionId) => {
  return answers.filter((answer) => answer.questionId === questionId);
};

const setQnaData = ({ questions, answers }) => {
  return questions.map((question) => ({
    ...question,
    matchedComments: findQuestionMatchedAnswer(answers, question.id),
  }));
};

const api = {
  getQuestionsAndAnswers: async () => {
    const qna = Promise.all([
      request(`${API_ENDPOINT}${URL.QUESTIOMS}`),
      request(`${API_ENDPOINT}${URL.ANSWERS}`),
    ])
      .then(([questions, answers]) =>
        setQnaData({
          questions,
          answers,
        })
      )
      .then((data) => {
        return data;
      });
    return qna;
  },
  getUsers: async () => {
    const users = await request(`${API_ENDPOINT}${URL.USERS}`);
    return users;
  },
  postAnswer: (data) => {
    const message = postMessageForm(data);
    request(`${API_ENDPOINT}${URL.ANSWERS}`, message);
  },
  postQuestion: (data) => {
    const message = postMessageForm(data);
    request(`${API_ENDPOINT}${URL.QUESTIOMS}`, message);
  },
};

export default api;
