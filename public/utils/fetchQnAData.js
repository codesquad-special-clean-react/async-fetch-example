import * as api from "../service/api.js";

export default async function fetchQnAData() {
  try {
    const [questions, answers] = await Promise.all([
      api.getQuestions(),
      api.getAnswers()
    ]);

    const matchedComments = question => ({
      ...question,
      matchedComments: [
        ...answers.filter(answer => answer.questionId === question.id)
      ]
    });

    const data = questions.map(question => matchedComments(question));

    return data;
  } catch (e) {
    console.log(e);
  }
}
