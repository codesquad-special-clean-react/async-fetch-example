import { postQuestion } from '../utils/api.js'
import { sel } from '../utils/util.js'
import { MESSEGE, MODAL_STATUS } from '../utils/constant.js'

export default function NewQuestion ($modal, render) {
  this.$title = sel('#q-title', $modal)
  this.$question = sel('#q-content', $modal)

  const init = () => {
    addDomEvent()
  }

  const addDomEvent = () => {
    $modal.addEventListener('click', closeQuestionModal)
    $modal.addEventListener('submit', handleNewQuestion)
  }

  const closeQuestionModal = ({ target }) => {
    if (target.classList.contains('close-btn')) {
      clearFormFiled()
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
    $modal.style.display = MODAL_STATUS.CLOSE
  }

  const handleNewQuestion = async (e) => {
    e.preventDefault()
    const { title, question } = getFormData()
    const isNotFillTheContent = title.length === 0 || question.length === 0
    if (isNotFillTheContent) {
      alert(MESSEGE.IsNotFillTheContent)
      return
    }
    try {
      const response = await postQuestion({ title, question })
      if (response.ok) {
        clearFormFiled()
        render()
      }
    } catch (err) {
      console.error('handleNewQuestion Error', err)
    }

  }

  init()
}
