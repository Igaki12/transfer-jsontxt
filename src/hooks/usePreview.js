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
      console.log('setFillingBlanksPreview:' + sentences)
      let questionNum = 0
      let newPreview = []
      let questionTxt = ''
      let answer = ''
      // let synthesizedTxt = ''
      // sentences.forEach((sentence) => {
      //   synthesizedTxt += sentence
      // })
      // synthesizedTxt.split(/^\s*[0-9]*\./)
      sentences.forEach((sentence) => {
        if (sentence.match(setting.questionStart) === null) {
          questionTxt += sentence.replace(setting.brackets, '(　)')
          // sentence = sentence.replace(/（.+?）/g, '()')
          console.log('解答部分を削除' + sentence)
        } else {
          if (questionNum === 0) {
            // sentence.match(/（.+?）/g).forEach((ans) => {
            //   answer += ans + ','
            // })
            questionTxt += sentence
              .replace(setting.brackets, '(　)')
              .replace(setting.questionStart, '')
            questionNum++
            return
          }
          let adding = `{detailInfo:"${questionNum}",questionImg:[],questionSentence:"${questionTxt}",answerImg:[],answer:"${answer}",commentary:"",},`
          console.log('adding:' + adding)
          newPreview.push(adding)
          answer = ''
          questionTxt = ''
          questionTxt += sentence
            .replace(setting.brackets, '(　)')
            .replace(setting.questionStart, '')
          questionNum = sentence.match(setting.questionStart)
        }
      })
      let adding = `{detailInfo:"${questionNum}",questionImg:[],questionSentence:"${questionTxt}",answerImg:[],answer:"${answer}",commentary:"",},`
      console.log('adding:' + adding)
      newPreview.push(adding)
      setPreview(newPreview)
      console.log(newPreview)
      // ここからMSForm時の回路
    } else if (setting.questionType === 'forms') {
      console.log('setMSFormsPreview:' + inputEl.current.value)

      let questionNum = 0
      let newPreview = []
      sentences.forEach((sentence) => {
        console.log('チェック開始：' + sentence)
        if (sentence.match(/^\s*[0-9]+\./g)) {
          questionNum++
          // choiceNum = 0
          let adding = `${
            questionNum !== 1 ? ']},' : ''
          }{detailInfo:"(${questionNum})",questionImg:[],questionSentence:"${
            sentence.split(/^\s*[0-9]+\./g)[1]
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
      setPreview(newPreview)
      console.log(preview)
      // カスタマイズ
    } else {
      console.log('カスタマイズ開始:' + sentences)
      let newPreview = []
      let detailInfo = ''
      let questionTxt = ''
      let answer = ''
      let choices = ''
      let continueFlag = null
      sentences.forEach((sentence, index) => {
        if (continueFlag === 'question') {
          if (setting.questionEnd && sentence.match(setting.questionEnd)) {
          } else if (setting.customCheck.indexOf('choices') !== -1) {
            if (setting.choiceStart) {
              if (sentence.match(setting.choiceStart)) {
              } else {
                console.log('問題は次の行まで続きます')
              }
            }
          } else if (setting.customCheck.indexOf('answer') !== -1) {
            if (setting.answerStart) {
              if (sentence.match(setting.answerStart)) {
              } else {
                console.log('問題は次の行まで続きます')
              }
            }
          } else {
            console.log(index + '問題は次の行まで続きます')
          }
        }
        if (setting.questionStart && sentence.match(setting.questionStart)) {
          detailInfo = sentence
            .match(setting.questionStart)
            .replace(/\.|．/g, '')
          if (setting.questionEnd && sentence.match(setting.questionEnd)) {
            questionTxt += sentence
              .split(setting.questionStart)[1]
              .split(setting.questionEnd)[0]
            sentence = sentence.split(setting.questionEnd)[1]
          } else if (
            setting.choiceStart &&
            sentence.match(setting.choiceStart)
          ) {
            questionTxt += sentence
              .split(setting.questionStart)[1]
              .split(setting.choiceStart)[0]
            sentence = sentence.split(setting.choiceStart)[1]
          } else if (
            setting.answerStart &&
            sentence.match(setting.answerStart)
          ) {
            questionTxt += sentence
              .split(setting.questionStart)[1]
              .split(setting.answerStart)[0]
            sentence = sentence.split(setting.answerStart)[1]
          } else if (sentence.match(setting.questionStart).length > 1) {
            console.log(index + ':2文以上の質問を検出しています')
            questionTxt += sentence.split(setting.questionStart)[1]
            sentence = sentence.split(setting.questionStart, 1)[1]
            sentences.push(sentence)
          } else {
            console.log(index + ':問題は次の行まで続いています')
            questionTxt += sentence.split(setting.questionStart)[1]
            return
          }
        }
        if (
          setting.customCheck.indexOf('choices') !== -1 &&
          setting.choiceStart &&
          sentence.match(setting.choiceStart)
        ) {
          if (sentence.match(setting.choiceStart).length > 1) {
          } else if (
            setting.answerStart &&
            sentence.match(setting.answerStart)
          ) {
          } else if (
            setting.questionStart &&
            sentence.match(setting.questionStart)
          ) {
          } else {
            console.log(index + ':選択肢は次の行まで続きます')
          }
        } else if (
          setting.customCheck.indexOf('choices') !== -1 &&
          sentence.length > 0
        ) {
          if (setting.questionStart && sentence.match(setting.questionStart)) {
          } else {
            console.log(index + '行の終わりで選択肢を区切りました。')
          }
        }
        if (
          setting.customCheck.indexOf('answer') !== -1 &&
          setting.answerStart &&
          sentence.match(setting.answerStart)
        ) {
          if (setting.answerEnd && sentence.match(setting.answerEnd)) {
          } else if (
            setting.questionStart &&
            sentence.match(setting.questionStart)
          ) {
          } else if (setting.answerEnd || setting.questionStart) {
            console.log(index + ':解答は次の行まで続きます')
          } else {
            console.log(index + ':行の終わりで解答を区切りました')
          }
        } else if (
          setting.customCheck.indexOf('answer') &&
          sentence.length > 0
        ) {
        }
        console.log('前の行からの続き:' + sentence)
      })
    }
  }
  return {
    showPreview,
    createPreview,
  }
}
