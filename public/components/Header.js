export default function Header({$el}) {

    const render = () => {
        $el.innerHTML = `
            <header id="main-header">
                <h1>STACK OOOOVERFLOW &#x1f64b; </h1>
                <div class="login-btn">로그인</div>
            </header>
        `;
    };

    const init = () => {
        render();
    };

    init();
}
