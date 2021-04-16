import QnaApp from './components/QnaApp.js';
import {$} from './utils/selector.js';

document.addEventListener('DOMContentLoaded', () => {
	new QnaApp({$el: $('#app')});
});
