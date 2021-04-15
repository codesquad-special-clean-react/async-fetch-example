import Dialog from "./dialog.js";
import Fetch from "./fetch.js";
import Page from "./page.js";

const QNADom = document.querySelector(".qna-wrap");
const NewBtn = document.querySelector(".new-question-btn");
const DialogDom = document.querySelector(".new-question-wrap");

const fetch = new Fetch();
const page = new Page(fetch, QNADom);
const dialog = new Dialog(page, fetch, DialogDom);

// event
document.addEventListener("DOMContentLoaded", async () => page.getQNAPage());
NewBtn.addEventListener("click", () => dialog.view());
