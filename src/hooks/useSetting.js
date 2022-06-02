import { useState } from 'react'

export const useSetting = () => {
  const [setting, setSetting] = useState({
    questionType: 'forms',
    newLine: /\n/g,
    questionStart: /^[0-9]*\./,
    choiceStart: '',
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
    newSetting.questionStart = string
    setSetting(newSetting)
  }
  const setChoiceStart = (string) => {
    let newSetting = setting
    newSetting.choiceStart = string
    setSetting(newSetting)
  }
  return {
    showSetting,
    setNewLine,
    setQuestionStart,
    setChoiceStart,
    setQuestionType,
  }
}
