const getAnswerTemplate = (answers) => {
  return answers.reduce((html, { id, content, userId, date }) => {
    return (
      html +
      `
				<li class="answer-list" data-answer-id="${+id}">
          <p class="answer-content">${content}</p>
          <div class="answer-profile">
            <span class="answer-writer">${userId} | </span>
            <span class="answer-date">${date}</span>
          </div>
				</li>`
    );
  }, ``);
};

export default getAnswerTemplate;
