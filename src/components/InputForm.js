import { Button, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
export const InputForm = ({ inputEl }) => {
  const [inputInfo, setInputInfo] = useState({
    row: 0,
    length: 0,
  })
  const [preview, setPreview] = useState([])

  const countInputTxt = () => {
    // setPreview([])
    console.log(inputEl.current.value)
    // let spaceCut = inputEl.current.value.split(' ').join('')
    // preview = [inputEl.current.value.split(/\n/g)]
    let sentences = inputEl.current.value.split(/\n\s+/g).filter(
      (row) => row !== '' && row !== '  ',
      // row.indexOf(
      //   'このフォームを送信すると、 所有者に名前とメールアドレスが表示されます。',
      // ) === -1 &&
      // row.indexOf('送信') === -1,
    )
    let startIndex = sentences.findIndex(
      (sentence) =>
        sentence.indexOf('所有者に名前とメールアドレスが表示されます。') !== -1,
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
    let questionNum = 0
    let newPreview = []
    sentences.forEach((sentence) => {
      console.log('チェック開始：' + sentence)
      if (sentence.match(/^[0-9]*\./)) {
        questionNum++
        // choiceNum = 0
        let adding = `${
          questionNum !== 1 ? '},' : ''
        }{detailInfo:'(${questionNum})',questionImg:[],questionSentence:'${
          sentence.split(/^[0-9]*\./)[1]
        }',answerImg:[],answer:"",commentary:"",
          choices:[`
        console.log('[0-9].を検出：' + adding)
        newPreview.push(adding)
      } else {
        // choiceNum++
        let adding = `'${sentence.replace('○', '')}',`
        console.log('選択肢を検出:' + adding)
        newPreview.push(adding)
      }
    })
    console.log(newPreview)
    newPreview.push(']},')
    setPreview([newPreview])
    // setPreview(
    // inputEl.current.value
    //   .split(/\n\s+/g)
    //   .filter(
    //     (row) =>
    //       row !== '' &&
    //       row !== '  ' &&
    //       row.indexOf(
    //         'このフォームを送信すると、 所有者に名前とメールアドレスが表示されます。',
    //       ) === -1 &&
    //       row.indexOf('送信') === -1,
    //   ),
    // )
    console.log(preview)

    setInputInfo({
      row: inputEl.current.value.split(/\n/g).length,
      length: inputEl.current.value.replace(/\s+/g, '').length,
    })
  }
  const copyTextToClipboard = (array) => {
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
  return (
    <>
      <Button colorScheme={'blue'} onClick={() => copyTextToClipboard(preview)}>
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
        onChange={countInputTxt}
        onBlur={countInputTxt}
        placeholder="ここにスキャンした文字列を貼り付け"
      ></Textarea>
      <Text>
        {inputInfo.row}行{inputInfo.length}文字
      </Text>
    </>
  )
}
