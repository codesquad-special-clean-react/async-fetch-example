import { getRequests, renderQna } from "../utils.js";
import { URL } from "../constants.js";

export const fetchQuestionsAndAnswers = () => {
  const requests = getRequests(URL);
  Promise.all(requests)
    .then(async ([answers, questions]) => [
      await answers.json(),
      await questions.json(),
    ])
    .then(([answers, questions]) => {
      renderQna({ answers, questions });
    });
};

export const addDOMContentLoaded = () => {
  document.addEventListener("DOMContentLoaded", () => {
    //코드시작
    fetchQuestionsAndAnswers();
  });
};
