export default class Dialog {
  constructor(page, fetch, dialogDOM) {
    // 외부 객체
    this.page = page;
    this.fetch = fetch;

    // 멤버 데이터
    this.dialog = dialogDOM;
    this.cancelBtn = this.dialog.firstElementChild;
    this.title = this.dialog.querySelector("#q-title");
    this.content = this.dialog.querySelector("#q-content");
    this.submitBtn = this.dialog.querySelector("button");

    // 이벤트 등록
    this.cancelBtn.addEventListener("click", () => this.reset());
    this.submitBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const title = this.title.value;
      const content = this.content.value;
      if (!(title && content)) {
        alert("내용을 입력해주세요");
        return;
      }

      this.addQuestion(title, content);
      this.page.getQNAPage();
      this.reset();
    });
  }

  view() {
    this.dialog.style.display = "block";
  }

  hidden() {
    this.dialog.style.display = "none";
  }

  reset() {
    this.title.value = "";
    this.content.value = "";
    this.hidden();
  }

  async addQuestion(title, content) {
    const body = JSON.stringify({
      title,
      question: content,
      userId: 3,
      error: "errr",
    });
    const result = await this.fetch.postData(
      "http://localhost:3001/questions",
      body
    );

    if (!result) {
      alert("질문 등록 에러");
      return;
    }

    alert("질문 등록했습니다.");
  }
}
