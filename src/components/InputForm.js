import { Button, Flex, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
export const InputForm = ({
  inputEl,
  showSetting,
  showPreview,
  createPreview,
}) => {
  const toast = useToast()
  const setting = showSetting()
  const preview = showPreview()
  const [inputInfo, setInputInfo] = useState({
    row: 0,
    length: 0,
  })

  const copyTextToClipboard = (array) => {
    console.log(array)
    // array = array.flat()
    let text = ''
    array.forEach((pre) => {
      console.log(pre)
      text = text + pre
    })
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying to clipboard was successful!')
      },
      function (err) {
        console.error('Async: Could not copy text: ', err)
      },
    )
    console.log(text)
  }
  // あとは*必須と改行などのタイプコンフィグ
  return (
    <>
      <Button
        colorScheme={'blue'}
        onClick={() => {
          copyTextToClipboard(preview)
          toast({
            title: 'Successfully copied!',
            position: 'bottom-left',
            description: preview,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }}
      >
        COPY
      </Button>
      {preview !== [] ? (
        <>
          {preview.map((value, i) => (
            <Text mb="8px" size={'sm'} key={i} className="copiedTxt">
              {value}
            </Text>
          ))}
        </>
      ) : (
        <Text mb="8px" size={'sm'}>
          'ここにプレビューが表示されます'
        </Text>
      )}
      <Textarea
        ref={inputEl}
        onChange={() => {
          createPreview(setting, inputEl)
          setInputInfo({
            row: inputEl.current.value.split(/\n/g).length,
            length: inputEl.current.value.replace(/\s+/g, '').length,
          })
        }}
        onBlur={() => {
          createPreview(setting, inputEl)
          setInputInfo({
            row: inputEl.current.value.split(/\n/g).length,
            length: inputEl.current.value.replace(/\s+/g, '').length,
          })
        }}
        placeholder="ここにスキャンした文字列を貼り付け"
      ></Textarea>
      <Flex>
        {inputInfo.row}行{inputInfo.length}文字
        <Button
          onClick={() => {
            toast({
              title: 'フォーム内容がリセットされました',
              // description: "We've created your account for you.",
              status: 'info',
              position: 'bottom-left',
              duration: 9000,
              isClosable: true,
            })
            inputEl.current.value = ''
          }}
        >
          RESET
        </Button>
      </Flex>
    </>
  )
}
