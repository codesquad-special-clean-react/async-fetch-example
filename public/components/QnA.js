import { getRequest, postQuestion } from '../util/api.js'
import { getQnATemplate } from '../util/template.js'
import { URL } from '../util/constant.js'
import $ from '../util/querySelector.js'

export default function QnA(){


  this.$newQnABtn = $('.new-question-btn')
  this.$newQnAModal = $('.new-question-wrap')

  const init = () => {
    console.log(this.state)
    contentLoading();
    addDomEvent();
  }

  const addDomEvent = () => {
    this.$newQnABtn.addEventListener('click', openModal)
    this.$newQnAModal.addEventListener('click', handleQuestionModal);
    this.$newQnAModal.addEventListener('submit', handleNewQuestion);

  }

  const openModal = ({target}) => {
    this.$newQnAModal.style.display = 'block'
  }

  const handleQuestionModal = ({target}) => {
    if (target.classList.contains('close-btn')) {
      this.$newQnAModal.style.display = 'none';
    }
  }

  const handleNewQuestion = async (e) => {
    e.preventDefault();
    const title = this.$newQnAModal.querySelector('#q-title').value;
    const question = this.$newQnAModal.querySelector('#q-content').value;
    const data = {
      title,
      question,
    }
    await postQuestion(data);
    this.$newQnAModal.querySelector('#q-title').value = '';
    this.$newQnAModal.querySelector('#q-content').value = '';
    this.$newQnAModal.style.display = 'none';
    contentLoading();
  }

  const contentLoading = () => {
    const requests = getRequest(URL)
    Promise.all(requests)
      .then(response => Promise.all(response.map((r, num) => r.json())))
      .then((result) => {
        const [questions, answers] = result
        renderQna({ questions, answers })
      })
  }

  const getAnswersMap = (answers) => {
    return answers.reduce((acc, answer) => {
      if (!acc[answer.questionId]) {
        acc[answer.questionId] = []
      }
      acc[answer.questionId].push(answer)
      return acc
    }, {})
  }

  const renderQna = ({ answers, questions }) => {
    const qnaWrap = $('.qna-wrap')
    const answersMap = getAnswersMap(answers)
    const questionsWithComments = questions.map((question) => {
      if (answersMap[question.id]) {
        question.matchedComments = answersMap[question.id]
      }
      return question
    })
    qnaWrap.innerHTML = getQnATemplate(questionsWithComments)
  }

  init()
}
