import { postQuestion } from '../utils/api.js'
import { selector } from '../utils/util.js'
import { MESSEGE, MODAL_STATUS } from '../utils/constant.js'

export default function Question ($modal, render) {
  this.$newQnABtn = selector('.new-question-btn')
  this.$newQnAModal = selector('.new-question-wrap')
  this.$title = selector('#q-title', $modal)
  this.$question = selector('#q-content', $modal)

  const init = () => {
    addDomEvent()
  }

  const addDomEvent = () => {
    this.$newQnABtn.addEventListener('click', openQuestionModal)
    $modal.addEventListener('click', closeQuestionModal)
    $modal.addEventListener('submit', handleNewQuestion)
  }

  const openQuestionModal = () => {
    this.$newQnAModal.style.display = MODAL_STATUS.OPEN
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
