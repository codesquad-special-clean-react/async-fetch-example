import { postQuestion } from '../util/api.js'
import sel from '../util/querySelector.js'

export default function NewQuestion ($modal, contentLoading) {
  this.$title = sel('#q-title', $modal)
  this.$question = sel('#q-content', $modal)

  const init = () => {
    addDomEvent()
  }

  const addDomEvent = () => {
    $modal.addEventListener('click', handleQuestionModal)
    $modal.addEventListener('submit', handleNewQuestion)
  }

  const handleQuestionModal = ({ target }) => {
    if (target.classList.contains('close-btn')) {
      $modal.style.display = 'none'
    }
  }

  const getFormData = () => {
    const { $title, $question } = this
    return {
      title: $title.value,
      question: $question.value,
    }
  }

  const clearFormFiled = () => {
    const { $title, $question } = this
    $title.value = ''
    $question.value = ''
    $modal.style.display = 'none'
  }

  const handleNewQuestion = async (e) => {
    e.preventDefault()
    const data = getFormData()
    const response = await postQuestion(data)
    if (response.ok) {
      clearFormFiled()
      contentLoading()
    }
  }

  init()
}
