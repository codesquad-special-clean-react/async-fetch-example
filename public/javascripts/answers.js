export const getAnswersMap = (answers) => {
  const answersMap = {};
  answers.forEach((answer) => {
    const isExists = !!answersMap[answer.questionId];
    if (!isExists) {
      answersMap[answer.questionId] = [];
    }
    answersMap[answer.questionId].push(answer);
  });
  return answersMap;
};
