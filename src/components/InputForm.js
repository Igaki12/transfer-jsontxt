import { Text, Textarea } from '@chakra-ui/react'
import React,{useState} from 'react'
export const InputForm = ({ inputEl }) => {
  const [inputInfo, setInputInfo] = useState({
    row: 0,
    length: 0,
  })
  const CountInputTxt = () => {
    setInputInfo({ length: inputEl.current.value.length })
  }
  return (
    <>
      <Text mb="8px" size={'sm'}>
        Value:{inputEl.current.value}
      </Text>
      <Textarea
        ref={inputEl}
        onChange={CountInputTxt}
        placeholder="ここにスキャンした文字列を貼り付け"
      ></Textarea>
      <Text>{inputInfo.length}文字</Text>
    </>
  )
}
