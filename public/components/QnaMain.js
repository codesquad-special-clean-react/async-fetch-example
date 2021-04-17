import apis from '../apis.js';
import {$} from '../utils/selector.js';
import QnaMainNewQuestionModal from './QnaMainNewQuestionModal.js';

function getAnswerTemplate(answers) {
    return answers.reduce((html, {content, userId, date}) => {
        return (
            html +
            `
        <li class="answer-list" ">
            <p class="answer-content">${content}</p>
            <div class="answer-profile">
                <span class="answer-writer">${userId} | </span>
                <span class="answer-date">${date}</span>
            </div>
        </li>`
        );
    }, ``);
}

function getLoadingAnswerTpl() {
    return `<li class="answer-list loading" ">
        Loading.....
     </li>`;
}

function getQnATemplate(data) {
    return data.reduce((html, {title, question, id, matchedComments = []}) => {
        return (
            html +
            ` <li class="qna" _questionId=${+id}>
        <div class="qna-title">
            <h2>${title}</h2>
        </div>
        <div class="question">
            <p> ${question}</p>
        </div>
        <ul class="answer">${getAnswerTemplate(matchedComments)}</ul>
        <div class="answer-form">
            <form method="POST">
                <textarea name="answer-content" class="answer-content-textarea" cols="30" rows="2" placeholder="새로운답변.."></textarea>
            </form>
            <button class="answer-submit">등록</button>
        </div>
    </li>`
        );
    }, ``);
}

export default function QnaMain({$el}) {

    this.setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState,
        };

        render();
    };

    const bindEvents = () => {
        $('[data-ref="new-question-open-btn"]', this.$el)
            .addEventListener('click', () => openOrCloseNewQuestionModal(true));
    };

    const render = async () => {
        this.$el.innerHTML = `
            <div class="main-wrap">
                <button class="new-question-btn" data-ref="new-question-open-btn">새로운질문</button>
                <ul class="qna-wrap">
                </ul>
                
                <div data-component="new-question-modal"></div>
            </div>
        `;

        $('.qna-wrap', this.$el).innerHTML = getQnATemplate(this.state.questions);
        this.components = {
            newQuestionModal: new QnaMainNewQuestionModal({
                $el: $('[data-component="new-question-modal"]', this.$el),
                props: {
                    isOpenNewQuestionModal: this.state.isOpenNewQuestionModal,
                },
                openOrCloseNewQuestionModal,
                addNewQuestion,
            }),
        };

        bindEvents();
    };

    const openOrCloseNewQuestionModal = (isOpen) => {
        this.setState({
            isOpenNewQuestionModal: isOpen,
        });
    };

    /**
     * 질문 목록 로드
     */
    const fetchQuestions = async () => {
        const [questions, answers] = await Promise.all([
            apis.getQuestions(),
            apis.getAnswers(),
        ]);

        this.setState({
            questions: questions.map(question => {
                return {
                    ...question,
                    matchedComments: answers.filter(({questionId}) => questionId === question.id),
                };
            }),
        });
    };

    /**
     * 새로운 질문 추가
     * @param title
     * @param question
     */
    const addNewQuestion = async ({title, question}) => {
        await apis.createQuestion({title, question});
        openOrCloseNewQuestionModal(false);

        await fetchQuestions();
    };

    const init = () => {
        this.$el = $el;
        this.state = {
            questions: [],
            isOpenNewQuestionModal: false,
        };
        render();
        fetchQuestions();
    };

    init();
}
