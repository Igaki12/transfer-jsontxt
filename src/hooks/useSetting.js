import { useState } from 'react'

export const useSetting = () => {
  const [setting, setSetting] = useState({
    newLine: /\n\s+/g,
    questionStart: /^[0-9]*\./,
    choiceStart: '',
  })
  const showSetting = () => {
    return setting
  }
  const setNewLine = (string) => {
    let newSetting = setting
    newSetting.newLine = string
    setSetting(newSetting)
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
  }
}
