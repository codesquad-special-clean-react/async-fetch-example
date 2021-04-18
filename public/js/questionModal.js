
const $questionBox = document.querySelector(".new-question-wrap");

const newQuestionModal = () => {
    showModal();
    closeModal();
}

const showModal = () => {
    const $newQuestionBtn = document.querySelector(".new-question-btn");

    $newQuestionBtn.addEventListener("click", ({target}) => {
        $questionBox.setAttribute("style", "display: block");
    });
}

const closeModal = () => {
    const $closeBtn = document.querySelector(".close-btn");

    $closeBtn.addEventListener("click", () => {
        $questionBox.setAttribute("style", "display: none");
    });
}