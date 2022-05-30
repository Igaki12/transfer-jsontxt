import './App.css'
import {} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { InputForm } from './components/InputForm'

function App() {
  const inputEl = useRef('ここに入力した文字列が表示されます')
  return <InputForm inputEl={inputEl} />
}

export default App
