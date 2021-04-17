import * as api from "../service/api.js";

export default async function matchedQuestionAnswer() {
  try {
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
  } catch (e) {
    console.log(e);
  }
}
