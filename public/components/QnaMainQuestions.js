import {$} from '../utils/selector.js';

export default function QnaMainQuestions({$el, props, addNewAnswer}) {

    function getAnswerTemplate(answers) {
        return answers.reduce((html, {content, userId, date}) => {
            return (
                html +
                `<li class="answer-list" ">
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
        return (
            `<li class="answer-list loading" ">
                Loading.....
            </li>`
        );
    }

    function getQnATemplate(data) {
        return data.reduce((html, {title, question, id, matchedComments = []}) => {
            return (
                html +
                `<li class="qna" _questionId=${+id} data-ref="question">
                    <div class="qna-title">
                        <h2>${title}</h2>
                    </div>
                    <div class="question">
                        <p> ${question}</p>
                    </div>
                    <ul class="answer">${getAnswerTemplate(matchedComments)}</ul>
                    <div class="answer-form">
                        <form method="POST" data-ref="new-answer-form">
                            <textarea name="answer-content" class="answer-content-textarea" cols="30" rows="2" placeholder="새로운답변.."></textarea>
                        </form>
                        <button class="answer-submit" data-ref="new-answer-btn">등록</button>
                    </div>
                </li>`
            );
        }, ``);
    }

    const bindEvents = () => {
        this.$el.addEventListener('click', async ({target}) => {
            if (target.dataset.ref !== 'new-answer-btn') {
                return;
            }

            const $question = target.closest('[data-ref="question"]');
            const questionId = Number($question.getAttribute('_questionId'));
            const {'answer-content': answerContent} = Object.fromEntries(new FormData($('[data-ref="new-answer-form"]', $question)));

            addNewAnswer({questionId, answerContent});
        });
    };

    const render = () => {
        this.$el.innerHTML = `
            <ul class="qna-wrap"></ul>
        `;
        $('.qna-wrap', this.$el).innerHTML = getQnATemplate(this.props.questions);

        bindEvents();
    };

    const init = () => {
        this.$el = $el;
        this.props = props;
        render();
    };

    init();
}
