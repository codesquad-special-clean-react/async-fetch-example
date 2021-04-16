import apis from '../apis.js';
import {$} from '../utils/selector.js';

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

    this.setState = ({questions}) => {
        this.state = {
            ...this.state,
            questions,
        };

        render();
    };

    const render = async () => {
        this.$el.innerHTML = `
            <div class="main-wrap">
                <button class="new-question-btn">새로운질문</button>
                <ul class="qna-wrap">
                </ul>
                
                <div class="new-question-wrap">
                    <div class="close-btn">X</div>
                    <form id="new-q-form" action="#" method="post">
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
            </div>
        `;

        $('.qna-wrap', this.$el).innerHTML = getQnATemplate(this.state.questions);
    };

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

    const init = () => {
        this.$el = $el;
        this.state = {
            questions: [],
        };
        render();
        fetchQuestions();
    };

    init();
}
