import { Text, Textarea } from '@chakra-ui/react'
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
    let sentences = inputEl.current.value
      .split(/\n\s+/g)
      .filter(
        (row) =>
          row !== '' &&
          row !== '  ' &&
          row.indexOf(
            'このフォームを送信すると、 所有者に名前とメールアドレスが表示されます。',
          ) === -1 &&
          row.indexOf('送信') === -1,
      )
    let questionNum = 0
    // let choiceNum = 0
    sentences.forEach((sentence) => {
      console.log('チェック開始：' + sentence)
      if (sentence.match(/^[0-9]*\./)) {
        questionNum++
        // choiceNum = 0
        let adding = `${
          questionNum !== 1 ? '},' : ''
        }{\ndetailInfo:'(${questionNum})',\nquestionSentence:'${
          sentence.split(/^[0-9]*\./)[1]
        }'
          choices:[`
        setPreview([...preview, adding])
        console.log('[0-9].を検出：' + adding)
        console.log(sentence.split(/^[0-9]*\./)[0])
      } else {
        // choiceNum++
        let adding = `${sentence.replace('○', '')},`
        console.log("選択肢を検出:" + adding)
        setPreview([...preview, adding])
      }
    })
    setPreview([...preview, '},'])
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
  return (
    <>
      {preview !== [] ? (
        <>
          {preview.map((value, i) => (
            <Text mb="8px" size={'sm'} key={i}>
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
