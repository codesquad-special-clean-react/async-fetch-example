import { delay, selector } from '../utils/util.js'
import { getLoadingAnswerTpl } from '../utils/template.js'
import { DELAY_TIME } from '../utils/constant.js'
import { postComment } from '../utils/api.js'

export default function Comment ($qnaList, render) {

  const init = () => {
    addDomEvent()
  }

  const addDomEvent = () => {
    $qnaList.forEach(($qna) => $qna.addEventListener('click', handleNewComment))
  }

  const handleNewComment = async (e) => {
    const { target, currentTarget } = e
    if (isValidAction(target)) return
    const $content = selector('.answer-content-textarea', target.closest('.answer-form'))

    const questionId = currentTarget.getAttribute('_questionId')
    const content = $content.value
    $content.value = ''

    try {
      selector('ul.answer', currentTarget).insertAdjacentHTML('beforeend', getLoadingAnswerTpl())
      await delay(DELAY_TIME)
      const response = await postComment({ questionId, content })
      if (response.ok) {
        await render()
      }
    } catch (err) {
      console.error('handleNewComment Error', err)
    }
  }

  const isValidAction = (target) => {
    const isAddCommentBtn = target.classList.contains('answer-submit')
    if (isAddCommentBtn === false) return true
    const commentValue = selector('.answer-content-textarea', target.closest('.answer-form')).value
    return commentValue.length === 0
  }

  init()
}
