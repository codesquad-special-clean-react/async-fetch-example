const URL = {
  questions: "http://localhost:3001/questions",
  answers: "http://localhost:3001/answers"
};

export async function getQuestions() {
  const response = await fetch(`${URL.questions}`);
  const data = await response.json();

  return data;
}

export async function getAnswers() {
  const response = await fetch(`${URL.answers}`);
  const data = await response.json();

  return data;
}
