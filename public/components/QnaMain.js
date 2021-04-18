import apis from '../apis.js';
import {$} from '../utils/selector.js';
import QnaMainNewQuestionModal from './QnaMainNewQuestionModal.js';
import QnaMainQuestions from './QnaMainQuestions.js';
import {getNowDateText} from '../utils/date.js';

export default function QnaMain({$el}) {

    this.setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState,
        };

        render();
    };

    const bindEvents = () => {
        $('[data-ref="new-question-open-btn"]', $el)
            .addEventListener('click', () => openOrCloseNewQuestionModal(true));
    };

    const render = async () => {
        $el.innerHTML = `
            <div class="main-wrap">
                <button class="new-question-btn" data-ref="new-question-open-btn">새로운질문</button>
                <div data-component="questions"></div>
                <div data-component="new-question-modal"></div>
            </div>
        `;

        this.components = {
            questions: new QnaMainQuestions({
                $el: $('[data-component="questions"]', $el),
                props: {
                    questions: this.state.questions,
                },
                addNewAnswer,
            }),

            newQuestionModal: new QnaMainNewQuestionModal({
                $el: $('[data-component="new-question-modal"]', $el),
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
        //todo validate new question(title, question)

        const userId = 2; //현재는 userId 고정
        await apis.createQuestion({userId, title, question});
        openOrCloseNewQuestionModal(false);

        await fetchQuestions();
    };

    /**
     * 새로운 답변 추가
     * @param questionId
     * @param answerContent
     */
    const addNewAnswer = async ({questionId, answerContent}) => {
        //todo validate new answer(answerContent)

        const userId = 2; //현재는 userId 고정
        await apis.createAnswer({userId, questionId, content: answerContent, date: getNowDateText()});

        await fetchQuestions();
    };

    const init = () => {
        this.state = {
            questions: [],
            isOpenNewQuestionModal: false,
        };
        render();
        fetchQuestions();
    };

    init();
}
