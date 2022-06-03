import './App.css'
import {} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { InputForm } from './components/InputForm'
import { Settings } from './components/Settings'
import { useSetting } from './hooks/useSetting'
import { usePreview } from './hooks/usePreview'
function App() {
  const inputEl = useRef('ここに入力した文字列が表示されます')
  const {
    showSetting,
    setQuestionType,
    setNewLine,
    setQuestionStart,
    setChoiceStart,
  } = useSetting()
  const { showPreview, createPreview } = usePreview()
  return (
    <>
      <Settings
        inputEl={inputEl}
        showSetting={showSetting}
        createPreview={createPreview}
        setNewLine={setNewLine}
        setQuestionType={setQuestionType}
        setQuestionStart={setQuestionStart}
      />
      <InputForm
        inputEl={inputEl}
        showSetting={showSetting}
        showPreview={showPreview}
        createPreview={createPreview}
      />
    </>
  )
}

export default App
