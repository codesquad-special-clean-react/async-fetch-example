import apis from '../apis.js';
import {$} from '../utils/selector.js';
import QnaMainNewQuestionModal from './QnaMainNewQuestionModal.js';
import QnaMainQuestions from './QnaMainQuestions.js';

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
                <div data-component="questions"></div>
                <div data-component="new-question-modal"></div>
            </div>
        `;

        this.components = {
            questions: new QnaMainQuestions({
                $el: $('[data-component="questions"]', this.$el),
                props: {
                    questions: this.state.questions,
                },
            }),

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
        //todo validate new question(title, question)

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
