import { URL, USER_ID } from "../config/api.js";
import { modalInputContents } from "../components/Modal.js";

const randowId = ~~((new Date().getMilliseconds() / 1000) * 9999);

const getQuestionData = async () => {
  try {
    const data = await fetch(URL.questions);
    const questions = await data.json();

    return questions;
  } catch (err) {
    console.log(err);
  }
};

const getAnswersData = async () => {
  try {
    const data = await fetch(URL.answers);
    const answers = await data.json();

    return answers;
  } catch (err) {
    console.log(err);
  }
};

export const createQuestion = async () => {
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
};

export const getAllData = () => {
  return Promise.all([getQuestionData(), getAnswersData()]);
};
