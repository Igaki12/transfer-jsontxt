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
      // カスタマイズ 現状questionEnd&answerEndは未実装
    } else {
      let splitter = sentences
        .join('\n')
        .match(new RegExp(setting.questionStart, 'g'))
      let splittedAll = sentences
        .join('\n')
        .split(new RegExp(setting.questionStart, 'g'))
        .reduce((prev, currentQuestion, QuestionIndex) => {
          let newQuestion = { detailInfo: '', questionSentence: '', answer: '' }
          if (splitter[QuestionIndex]) {
            newQuestion.detailInfo = splitter[QuestionIndex]
          } else {
            newQuestion.detailInfo = '(' + QuestionIndex + ')'
          }
          if (setting.customCheck.indexOf('choices') !== -1) {
            if (setting.choiceStart) {
            } else {
              setting.choiceStart = '\n'
            }
            if (setting.customCheck.indexOf('answer') !== -1) {
              newQuestion.questionSentence = currentQuestion
                .split(new RegExp(setting.choiceStart, 'g'))[0]
                .replace('\n', '')
              newQuestion.choices = currentQuestion
                .split(new RegExp(setting.choiceStart, 'g'))
                .map((choice, choiceIndex) => {
                  if (
                    choice.split(new RegExp(setting.answerStart, 'g')).length >
                    1
                  ) {
                    newQuestion.answer = choice.split(
                      new RegExp(setting.answerStart, 'g'),
                    )[1]
                    return choice
                      .split(new RegExp(setting.answerStart))[0]
                      .replace('\n', '')
                  } else {
                    return choice.replace('\n', '')
                  }
                })
            } else {
              newQuestion.questionSentence = currentQuestion
                .split(new RegExp(setting.choiceStart, 'g'))[0]
                .replace('\n', '')
              newQuestion.choices = currentQuestion
                .split(new RegExp(setting.choiceStart, 'g'))
                .slice(1)
                .map((value) => value.replace('\n', ''))
            }
          }
          return [...prev, newQuestion]
        }, [])
      console.log('全ての分割が完了:')
      console.log(splittedAll)
      setPreview(
        splittedAll.reduce((prev, question) => {
          return [
            ...prev,
            `{detailInfo:"${question.detailInfo}",questionSentence:"${
              question.questionSentence
            }",questionImg:[],choices:['${question.choices.join(
              "','",
            )}'],answerImg:[],answer:"${question.answer}",commentary:""},`,
          ]
        }, []),
      )
      // console.log('カスタマイズ開始:' + sentences)
      // let newPreview = []
      // let turn = 'question'
      // let detailInfo = ''
      // let questionTxt = ''
      // let choices = []
      // let c = ''
      // let answer = ''
      // sentences.forEach((sentence, index) => {
      //   while (sentence !== '') {
      //     console.log('ループ処理開始：' + sentence)
      //     if (turn === 'question') {
      //       if (setting.questionStart) {
      //         if (sentence.match(setting.questionStart)) {
      //           console.log(`問題文開始:${index}`)
      //           console.log(
      //             'まとめる場所はここ？:' +
      //               detailInfo +
      //               ',questionTxt:' +
      //               questionTxt +
      //               'choices:' +
      //               choices +
      //               'answer:' +
      //               answer,
      //           )
      //           detailInfo = sentence.match(setting.questionStart)[0]
      //           if (setting.customCheck.indexOf('choices') !== -1) {
      //             if (setting.choiceStart) {
      //               if (sentence.match(setting.choiceStart)) {
      //                 questionTxt += sentence
      //                   .split(setting.questionStart)[1]
      //                   .split(setting.choiceStart)[0]
      //                 sentence = sentence.split(setting.choiceStart)[1]
      //                 turn = 'choices'
      //               } else {
      //                 questionTxt += sentence.split(setting.questionStart)[1]
      //                 sentence = ''
      //               }
      //             } else {
      //               questionTxt += sentence.split(setting.questionStart)[1]
      //               sentence = ''
      //               turn = 'choices'
      //             }
      //           } else if (setting.customCheck.indexOf('answer') !== -1) {
      //             if (setting.answerStart) {
      //               if (sentence.match(setting.answerStart)) {
      //                 questionTxt += sentence
      //                   .split(setting.questionStart)[1]
      //                   .split(setting.answerStart)[0]
      //                 sentence = sentence.split(setting.answerStart)[1]
      //                 turn = 'answer'
      //               } else {
      //                 questionTxt += sentence.split(setting.questionStart)[1]
      //                 sentence = ''
      //               }
      //             } else {
      //               questionTxt += sentence.split(setting.questionStart)[1]
      //               sentence = ''
      //               turn = 'answer'
      //             }
      //           } else {
      //             questionTxt += sentence.split(setting.questionStart)[1]
      //             if (sentence.split(setting.questionStart).length > 2) {
      //               sentence = sentence.split(setting.questionStart)[2]
      //               turn = 'question'
      //             } else {
      //               sentence = ''
      //               turn = 'question'
      //             }
      //           }
      //         }
      //       }
      //       // if OR else if??
      //     } else if (turn === 'choices') {
      //       if (setting.choiceStart) {
      //         if (sentence.match(setting.choiceStart)) {
      //           if (c) {
      //             choices.push(c)
      //             c = ''
      //           }
      //           if (sentence.split(setting.choiceStart).length > 2) {
      //             c += sentence.split(setting.choiceStart)[1]
      //             sentence = sentence.split(setting.choiceStart)[2]
      //           } else if (setting.customCheck.indexOf('answer') !== -1) {
      //             if (setting.answerStart) {
      //               if (sentence.match(setting.answerStart)) {
      //                 c += sentence
      //                   .split(setting.choiceStart)[1]
      //                   .split(setting.answerStart)[0]
      //                 choices.push(c)
      //                 c = ''
      //                 sentence = sentence.split(setting.answerStart)[1]
      //                 turn = 'answer'
      //               } else {
      //                 c += sentence.split(setting.choiceStart)[1]
      //                 sentence = ''
      //               }
      //             } else {
      //               // 文末で区切る
      //               c += sentence.split(setting.choiceStart)[1]
      //               choices.push(c)
      //               c = ''
      //             }
      //           } else {
      //             // next is questionSentence
      //             if (setting.questionStart) {
      //               if (sentence.match(setting.questionStart)) {
      //                 c += sentence
      //                   .split(setting.choiceStart)[1]
      //                   .split(setting.questionStart)[0]
      //                 choices.push(c)
      //                 c = ''
      //                 sentence = sentence.split(setting.questionStart)[1]
      //                 turn = 'question'
      //               } else {
      //                 c += sentence.split(setting.choiceStart)[1]
      //                 sentence = ''
      //               }
      //             }
      //           }
      //         } else {
      //           if (setting.answerStart) {
      //             if (sentence.match(setting.answerStart)) {
      //               c += sentence.split(setting.answerStart)[0]
      //               choices.push(c)
      //               sentence = sentence.split(setting.answerStart)[1]
      //               turn = 'answer'
      //             } else {
      //               c += sentence.toString()
      //               sentence = ''
      //             }
      //           } else {
      //             if (sentence.match(setting.questionStart)) {
      //               c += sentence.split(setting.questionStart)[0]
      //               choices.push(c)
      //               sentence = sentence.split(setting.questionStart)[1]
      //               turn = 'question'
      //             } else {
      //               c += sentence.toString()
      //               sentence = ''
      //             }
      //           }
      //         }
      //       } else {
      //         // if choiceStart === undefined,choice is splitted by sentence
      //         if (setting.customCheck.indexOf('answer') !== -1) {
      //           if (setting.answerStart) {
      //             if (sentence.match(setting.answerStart)) {
      //               c += sentence.split(setting.answerStart)[0]
      //               choices.push(c)
      //               c = ''
      //               turn = 'answer'
      //             } else {
      //               c += sentence.toString()
      //               choices.push(c)
      //               c = ''
      //             }
      //           } else {
      //             // choiceStartがなくてanswerStartもないことはあり得ない
      //           }
      //         } else {
      //           if (setting.questionStart) {
      //             if (sentence.match(setting.questionStart)) {
      //               c += sentence.split(setting.questionStart)[0]
      //               choices.push(c)
      //               c = ''
      //               turn = 'question'
      //             } else {
      //               c += sentence.toString()
      //               choices.push(c)
      //               c = ''
      //             }
      //           } else {
      //             // choiceStartがなくてquestionStartもないことはあり得ない
      //           }
      //         }
      //       }
      //     } else if (turn === 'answer') {
      //       if (setting.answerStart) {
      //         if (sentence.match(setting.questionStart)) {
      //           answer += sentence
      //             .split(setting.answerStart)[0]
      //             .split(setting.questionStart)[0]
      //           sentence = sentence.split(setting.questionStart)[1]
      //           turn = 'question'
      //         } else {
      //           answer += sentence.toString()
      //           sentence = ''
      //         }
      //       } else {
      //         // 文頭からANSWERとして認識
      //         if (setting.questionStart) {
      //           if (sentence.match(setting.questionStart)) {
      //             answer += sentence.split(setting.questionStart)[0]
      //             sentence = sentence.split(setting.questionStart)[1]
      //             turn = 'question'
      //           } else {
      //             answer += sentence.toString()
      //             sentence = ''
      //           }
      //         }
      //       }
      //     }
      //   }
      // })
    }
  }
  return {
    showPreview,
    createPreview,
  }
}
