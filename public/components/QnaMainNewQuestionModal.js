import {$} from '../utils/selector.js';

export default function QnaMainNewQuestionModal({$el, props, openOrCloseNewQuestionModal, addNewQuestion}) {

    const bindEvents = () => {
        $('[data-ref="new-question-close-btn"]', $el)
            .addEventListener('click', () => openOrCloseNewQuestionModal(false));
        $('[data-ref="new-question-form"]', $el)
            .addEventListener('submit', async (event) => {
                event.preventDefault();
                await addNewQuestion(Object.fromEntries(new FormData(event.target)));
            });
    };

    const render = () => {

        if (!this.props.isOpenNewQuestionModal) {
            $el.innerHTML = '';
            return;
        }

        $el.innerHTML = `
            <div class="new-question-wrap">
                <div class="close-btn" data-ref="new-question-close-btn">X</div>
                <form id="new-q-form" action="#" method="post" data-ref="new-question-form">
                    <div>
                        <label for="q-title">제목</label>
                        <input type="text" name="title" id="q-title">
                    </div>
                    <div>
                        <label for="q-content">내용</label>
                        <textarea name="question" id="q-content" cols="30" rows="10"></textarea>
                    </div>
                    <button type="submit">질문등록</button>
                </form>
            </div>
        `;

        bindEvents();
    };

    const init = () => {
        this.props = props;
        render();
    };

    init();
}
