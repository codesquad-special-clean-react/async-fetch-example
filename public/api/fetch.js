import { URL, USER_ID } from "../config/api.js";
import { modalInputContents } from "../components/Modal.js";
import { getQnATemplate } from "../template/template.js";

const randowId = ~~((new Date().getMilliseconds() / 1000) * 9999);

async function getQuestionData() {
  try {
    const data = await fetch(URL.questions);
    const questions = await data.json();

    return questions;
  } catch (err) {
    console.log(err);
  }
}

async function getAnswersData() {
  try {
    const data = await fetch(URL.answers);
    const answers = await data.json();

    return answers;
  } catch (err) {
    console.log(err);
  }
}

function filterAnswers(answers, id) {
  return answers.filter((asnwer) => asnwer.questionId === id);
}

export async function createQuestion() {
  try {
    await fetch(URL.questions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: randowId,
        userId: USER_ID,
        title: modalInputContents.title,
        question: modalInputContents.content,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

export function getAllData() {
  Promise.all([getQuestionData(), getAnswersData()])
    .then((res) => {
      const data = {
        questions: [...res[0]],
        answers: [...res[1]],
      };
      const { questions, answers } = data;

      const combineQna = questions.map((question) => {
        const matchedAnswer = filterAnswers(answers, question.id);
        return {
          ...question,
          matchedComments: matchedAnswer,
        };
      });

      document.querySelector(".qna-wrap").innerHTML = getQnATemplate(
        combineQna
      );
    })
    .catch((err) => console.log(err));
}
