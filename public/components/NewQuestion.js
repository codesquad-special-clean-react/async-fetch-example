import { postQuestion } from '../util/api.js'
import sel from '../util/querySelector.js'
import { MESSEGE } from '../util/constant.js'

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
    const title = $title.value
    const question = $question.value
    return {
      title,
      question,
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
    const { title, question } = getFormData()
    const isNotFillTheContent = title.length === 0 || question.length === 0
    if (isNotFillTheContent) {
      alert(MESSEGE.IsNotFillTheContent)
      return
    }
    const response = await postQuestion({ title, question })
    if (response.ok) {
      clearFormFiled()
      contentLoading()
    }
  }

  init()
}
