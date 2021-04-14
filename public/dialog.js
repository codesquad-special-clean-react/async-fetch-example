import Fetch from "./fetch.js";
const fetch = new Fetch();

export default class Dialog {
  constructor(dialog, qna) {
    this.dialog = dialog;
    this.qna = qna;
    this.cancelBtn = this.dialog.firstElementChild;
    this.title = this.dialog.querySelector("#q-title");
    this.content = this.dialog.querySelector("#q-content");
    this.submitBtn = this.dialog.querySelector("button");
    console.log(this.title);
    console.log(this.content);
    console.log(this.submitBtn);

    this.cancelBtn.addEventListener("click", () => this.hidden());
    this.submitBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const title = this.title.value;
      const content = this.content.value;
      if (!(title && content)) {
        alert("내용을 입력해주세요");
      }

      this.addQuestion(title, content);
    });
  }

  view() {
    this.dialog.style.display = "block";
  }

  hidden() {
    this.dialog.style.display = "none";
  }

  async addQuestion(title, content) {
    const body = JSON.stringify({
      title,
      question: content,
      userId: 3,
    });
    const result = await fetch.postData(
      "http://localhost:3001/questions",
      body
    );

    console.log(body, result);
    if (!result) {
      alert("질문 등록 에러");
      return;
    }

    alert("질문 등록했습니다.");
    // console.log(this.qna);
    //   fetch("http://localhost:3001/questions", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title: title,
    //       question: content,
    //       userId: 3,
    //     }),
    //   })
    //     .then((response) => console.log(response))
    //     .catch((error) => console.log(`POST fetch error: ${error}`));
  }
}
