import * as api from "../service/api.js";

export default async function getData() {
  const [questions, answers] = await Promise.all([
    api.getQuestions(),
    api.getAnswers()
  ]);

  const data = questions.map(question => ({
    ...question,
    matchedComments: [
      ...answers.filter(answer => answer.questionId === question.id)
    ]
  }));

  return data;
}
