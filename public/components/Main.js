import { getAllData } from "../api/fetch.js";
import { modalToggle } from "./Modal.js";
import { getQnATemplate } from "../template/template.js";

export const submitComment = () => {
  console.log("댓글작성");
};

export const Main = () => {
  const questionBtn = document.querySelector(".new-question-btn");

  questionBtn.addEventListener("click", () => {
    modalToggle(true);
  });

  const filterAnswers = (answers, id) => {
    return answers.filter((asnwer) => asnwer.questionId === id);
  };

  getAllData()
    .then((res) => {
      const data = {
        questions: [...res[0]],
        answers: [...res[1]],
      };
      const { questions, answers } = data;
      const qnaWrap = document.querySelector(".qna-wrap");

      const combineQna = questions.map((question) => {
        const matchedAnswer = filterAnswers(answers, question.id);
        return {
          ...question,
          matchedComments: matchedAnswer,
        };
      });

      qnaWrap.innerHTML = getQnATemplate(combineQna);
    })
    .then(() => {
      const commentCreateBtn = document.querySelector(".answer-form");

      commentCreateBtn.addEventListener("click", ({ target }) => {
        console.log(target);
      });
    })
    .catch((err) => console.log(err));
};
