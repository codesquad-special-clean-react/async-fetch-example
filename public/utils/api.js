const API_ENDPOINT = "http://localhost:3001";
const URL = {
  QUESTIOMS: "/questions",
  ANSWERS: "/answers",
  USERS: "/users",
};

const request = async (url) => {
  const res = await fetch(url);
  const flag = res.ok;
  const data = res.json();
  if (!flag) {
    throw data;
  }
  return data;
};

const setData = ({ questions, answers }) => {
  return questions.map((question) => {
    const matchedComments = answers.filter((answer) => {
      return answer.questionId === question.id;
    });
    question.matchedComments = matchedComments;
    return question;
  });
};

const api = {
  getQuestionsAndAnswers: async () => {
    const questions = await request(`${API_ENDPOINT}${URL.QUESTIOMS}`);
    const answers = await request(`${API_ENDPOINT}${URL.ANSWERS}`);
    const questionArray = await setData({
      questions,
      answers,
    });
    return questionArray;
  },
  getUsers: async () => {
    const users = await request(`${API_ENDPOINT}${URL.USERS}`);
    return users;
  },
};

export default api;
