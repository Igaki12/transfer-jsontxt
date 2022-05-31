import './App.css'
import {} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { InputForm } from './components/InputForm'
import { Settings } from './components/Settings'
import { useSetting } from './hooks/useSetting'
function App() {
  const inputEl = useRef('ここに入力した文字列が表示されます')
  const {
    showSetting,
    setNewLine,
    setQuestionStart,
    setChoiceStart,
  } = useSetting()
  return (
    <>
      <InputForm inputEl={inputEl} showSetting={showSetting} />
      <Settings setNewLine={setNewLine} />
    </>
  )
}

export default App
