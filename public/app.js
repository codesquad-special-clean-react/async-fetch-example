import { Main } from "./components/Main.js";
import { Modal } from "./components/Modal.js";
import { mainTemplate, headerTemplate } from "./template/template.js";

document.addEventListener("DOMContentLoaded", () => {
  const headerElement = document.createElement("header");
  const mainElement = document.createElement("main");

  headerElement.innerHTML = headerTemplate;
  mainElement.innerHTML = mainTemplate;

  document.getElementById("root").append(headerElement, mainElement);

  Main();
  Modal();
});
