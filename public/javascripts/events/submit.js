import { URL, FETCH_POST_OPTIONS } from "../constants.js";
import { toggleModal } from "./click.js";
import { fetchQuestionsAndAnswers } from "./DOMContentLoaded.js";

const getFormData = (form) => {
  return Array.from(form.querySelectorAll("input,textarea")).reduce(
    (accumulator, input) => ({
      ...accumulator,
      [input.name]: input.value,
    }),
    { userId: 3 }
  );
};

const handleSubmitNewQuestion = async (form) => {
  try {
    const formData = getFormData(form);
    await fetch(URL.questions, {
      ...FETCH_POST_OPTIONS,
      body: JSON.stringify(formData),
    });
    toggleModal(false);
    fetchQuestionsAndAnswers();
  } catch (e) {
    alert(e);
  }
};

export const addSubmit = () => {
  document.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (event.target.id === "new-q-form") {
      await handleSubmitNewQuestion(event.target);
    }
  });
};
