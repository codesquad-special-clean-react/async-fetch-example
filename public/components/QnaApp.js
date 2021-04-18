import QnaMain from './QnaMain.js';
import Header from './Header.js';
import {$} from '../utils/selector.js';

export default function QnaApp({$el}) {

    const render = () => {
        $el.innerHTML = `
            <div data-component="header"></div>
            <div data-component="qna-main"></div>
        `;

        this.components = {
            header: new Header({$el: $('[data-component="header"]', $el)}),
            qnaMain: new QnaMain({$el: $('[data-component="qna-main"]', $el)}),
        };
    };

    const init = () => {
        render();
    };

    init();
}
