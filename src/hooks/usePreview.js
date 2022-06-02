import { useState } from 'react'

export const usePreview = () => {
  const [preview, setPreview] = useState(['ここに結果が表示されます'])
  const showPreview = () => {
    return preview
  }
  const createPreview = (setting, inputEl) => {
    let sentences = inputEl.current.value
      .split(setting.newLine)
      .filter((row) => row !== ' ' && row !== '  ')
    let startIndex = sentences.findIndex(
      (sentence) =>
        sentence.indexOf('所有者に名前とメールアドレスが表示されます。') !== -1,
    )
    if (startIndex !== -1) {
      sentences.splice(0, startIndex + 1)
    }
    startIndex = -1
    startIndex = sentences.findIndex(
      (sentence) => sentence.indexOf('*必須') !== -1,
    )
    if (startIndex !== -1) {
      sentences.splice(0, startIndex + 1)
    }
    let endIndex = sentences.findIndex((sentence) =>
      sentence.trim().match('送信'),
    )
    if (endIndex !== -1) {
      sentences = sentences.splice(0, endIndex)
    }
    console.log('端をtrim:' + startIndex + ',' + endIndex)

    // ここから問題形式ごとに分岐
    if (setting.questionType === 'filling') {
      console.log('setFillingBlanksPreview:' + inputEl.current.value)
    } else {
      console.log('setMSFormsPreview:' + inputEl.current.value)

      let questionNum = 0
      let newPreview = []
      sentences.forEach((sentence) => {
        console.log('チェック開始：' + sentence)
        if (sentence.match(/^[0-9]*\./)) {
          questionNum++
          // choiceNum = 0
          let adding = `${
            questionNum !== 1 ? ']},' : ''
          }{detailInfo:"(${questionNum})",questionImg:[],questionSentence:"${
            sentence.split(/^[0-9]*\./)[1]
          }",answerImg:[],answer:"",commentary:"",
            choices:[`
          console.log('[0-9].を検出：' + adding)
          newPreview.push(adding)
        } else {
          // choiceNum++
          let adding = `"${sentence.replace('○', '')}",`
          console.log('選択肢を検出:' + adding)
          newPreview.push(adding)
        }
      })
      console.log(newPreview)
      newPreview.push(']},')
      setPreview([newPreview])
      console.log(preview)
    }
  }
  return {
    showPreview,
    createPreview,
  }
}
