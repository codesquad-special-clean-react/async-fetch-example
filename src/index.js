import { render, createElement } from './reilly';
// https://ko.reactjs.org/docs/react-without-jsx.html

const L = /*alias*/ createElement;

render(
  L(
    Header,
    null,
    L('h1', { className: 'title' }, 'stack-underflow'),
    L('p', null, 'this is test node'),
    L('button', { className: 'cta-button' }, 'click me!')
  ),
  document.getElementById('root')
);

function Header({ children }) {
  return L('header', null, children);
}
