export default function getAnswerTemplate(answers) {
  return answers.reduce((html, { content, userId, date }) => {
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
