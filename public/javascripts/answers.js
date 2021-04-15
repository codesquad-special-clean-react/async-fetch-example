export const getAnswersMap = (answers) => {
  return answers.reduce((accumulator, answer) => {
    if (!accumulator[answer.questionId]) {
      accumulator[answer.questionId] = [];
    }
    accumulator[answer.questionId].push(answer);
    return accumulator;
  }, {});
};
