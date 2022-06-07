import { useState } from 'react'

export const useSetting = () => {
  const [setting, setSetting] = useState({
    questionType: 'forms',
    newLine: /\n/g,
    questionStart: /^[0-9]*\./g,
    questionEnd: undefined,
    choiceStart: undefined,
    answerStart: undefined,
    answerEnd: undefined,
    brackets: /\(.+?\)/g,
    customCheck: ['sentence'],
  })
  const showSetting = () => {
    return setting
  }
  const setQuestionType = (type) => {
    let newSetting = setting
    newSetting.questionType = type
    setSetting(newSetting)
  }
  const setNewLine = (strNum) => {
    let newSetting = setting
    if (strNum === 2) {
      newSetting.newLine = /\n\s+/g
    } else if (strNum === 3) {
      newSetting.newLine = /\s+/g
    } else {
      newSetting.newLine = /\n/g
    }
    setSetting(newSetting)
    console.log('setNewLine:' + newSetting.newLine)
  }
  const setQuestionStart = (string) => {
    let newSetting = setting
    if (string) {
      newSetting.questionStart = new RegExp(string, 'g')
    } else {
      newSetting.questionStart = /^[0-9]*\./g
    }

    setSetting(newSetting)
  }
  const setQuestionEnd = (string) => {
    let newSetting = setting
    if (string) {
      newSetting.questionEnd = new RegExp(string, 'g')
    } else {
      newSetting.questionEnd = undefined
    }
    setSetting(newSetting)
  }
  const setChoiceStart = (string) => {
    let newSetting = setting
    if (string) {
      newSetting.choiceStart = new RegExp(string, 'g')
    } else {
      newSetting.choiceStart = undefined
    }
    setSetting(newSetting)
  }
  const setAnswerStart = (string) => {
    let newSetting = setting
    if (string) {
      newSetting.answerStart = new RegExp(string, 'g')
    } else {
      newSetting.answerStart = undefined
    }
    setSetting(newSetting)
  }
  const setAnswerEnd = (string) => {
    let newSetting = setting
    if (string) {
      newSetting.answerEnd = new RegExp(string, 'g')
    } else {
      newSetting.answerEnd = undefined
    }
    setSetting(newSetting)
  }
  const setBrackets = (string) => {
    let newSetting = setting
    if (string) {
      newSetting.brackets = new RegExp(string, 'g')
    } else {
      newSetting.brackets = /\(.+?\)/g
    }
    setSetting(newSetting)
  }
  const toggleCustomCheck = (string) => {
    let newSetting = setting
    if (setting.customCheck.indexOf(string) === -1) {
      newSetting.customCheck.push(string)
    } else {
      newSetting.customCheck = newSetting.customCheck.filter(
        (custom) => custom !== string,
      )
    }
    setSetting(newSetting)
    console.log(setting.customCheck)
  }
  return {
    showSetting,
    setNewLine,
    setQuestionStart,
    setQuestionEnd,
    setChoiceStart,
    setAnswerStart,
    setAnswerEnd,
    setQuestionType,
    setBrackets,
    toggleCustomCheck,
  }
}
