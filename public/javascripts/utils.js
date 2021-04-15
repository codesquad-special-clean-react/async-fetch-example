import { getQnATemplate } from "./templates.js";

export const getAnswersMap = (answers) => {
  return answers.reduce((accumulator, answer) => {
    if (!accumulator[answer.questionId]) {
      accumulator[answer.questionId] = [];
    }
    accumulator[answer.questionId].push(answer);
    return accumulator;
  }, {});
};

export const getRequests = (URL) => {
  return Object.keys(URL)
    .sort()
    .map((key) => fetch(URL[key]));
};

export const renderQna = ({ answers, questions }) => {
  const qnaWrap = document.querySelector(".qna-wrap");
  const answersMap = getAnswersMap(answers);
  const questionsWithComments = questions.map((question) => {
    if (answersMap[question.id]) {
      question.matchedComments = answersMap[question.id];
    }
    return question;
  });
  qnaWrap.innerHTML = getQnATemplate(questionsWithComments);
};

const addZero = (number) => {
  const stringifiedNumber = number.toString();
  return stringifiedNumber.length > 1
    ? stringifiedNumber
    : `0${stringifiedNumber}`;
};

export const getDate = () => {
  const now = new Date();
  return [now.getFullYear(), now.getMonth() + 1, now.getDate()].reduce(
    (accumulator, unit, index) => {
      accumulator += `${index === 0 ? "" : "-"}${addZero(unit)}`;
      return accumulator;
    },
    ""
  );
};
