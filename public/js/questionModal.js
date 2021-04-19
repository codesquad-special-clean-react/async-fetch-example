const $questionBox = document.querySelector(".new-question-wrap");
let newIdx = -1;

const newQuestionModal = () => {
    const $newQuestionBtn = document.querySelector(".new-question-btn");
    const $closeBtn = document.querySelector(".close-btn");

    $newQuestionBtn.addEventListener("click", ({target}) => {
        showModal();
    });

    $closeBtn.addEventListener("click", () => {
        closeModal();
    });

    addNewQuestion();
}

const showModal = () => {
    getNewIdx();
    $questionBox.setAttribute("style", "display: block");
}

const closeModal = () => {
    $questionBox.setAttribute("style", "display: none");
}

const addNewQuestion = () => {
    document.querySelector("#new-q-form").addEventListener("submit", (e) => {
        e.preventDefault();

        getNewQuestionInfo();
    });
}


const getNewIdx = () => {
    const $questionArr = document.querySelectorAll("li.qna");

    const maxIdx = Array.from($questionArr).reduce((accumulator, currentValue) => {
        const accumulatorId = accumulator.getAttribute("_questionid");
        const currentValueId = currentValue.getAttribute("_questionid");

        return (accumulatorId > currentValueId) ? accumulator : currentValue;
    });

    newIdx = Number(maxIdx.getAttribute("_questionid")) + 1;
}


const getNewQuestionInfo = () => {
    const $title = document.querySelector("#q-title");
    const $content = document.querySelector("#q-content");

    questionData.push({
        id: newIdx,
        title: $title.value,
        question: $content.value,
        userId: 2,
        matchedComments: []
    });

    clearQuestionForm();
    closeModal();
    makeQuestionList();
}

const clearQuestionForm = () => {
    const $title = document.querySelector("#q-title");
    const $content = document.querySelector("#q-content");

    $title.value = "";
    $content.value = "";
}