const getLoadingAnswerTpl = () => {
  return `<li class="answer-list loading">
    Loading.....
  </li>`;
};

const addLoader = (el) => {
  el.innerHTML += getLoadingAnswerTpl();
};

export default addLoader;
