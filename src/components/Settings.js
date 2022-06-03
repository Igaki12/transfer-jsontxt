import {
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  Stack,
  Text,
  Input,
  Box,
  useDisclosure,
  Button,
  Collapse,
  Code,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
export const Settings = ({
  inputEl,
  setNewLine,
  setQuestionType,
  showSetting,
  createPreview,
  setQuestionStart,
}) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputNewLine = useRef()
  const inputAnswerEnd = useRef()
  const inputAnswerStart = useRef()
  const inputChoiceStart = useRef()
  const inputChoiceEnd = useRef()
  const inputQuestionEnd = useRef()
  const inputQuestionStart = useRef()
  const [infoTxt, setInfoTxt] = useState()
  const setting = showSetting()
  let nl = `'${setting.newLine}'次第`
  const checkForm = (str) => {
    let con = ''
    if (str) {
      con = new RegExp(str, 'g')
    } else {
      return
    }
    if (inputEl.current.value && inputEl.current.value.match(con)) {
      let count = inputEl.current.value.match(con).length
      setInfoTxt(`入力された${str}は文章内に${count}回出現しています。`)
    } else {
      setInfoTxt(`入力された${str}は文章内に存在しません`)
    }
  }
  return (
    <>
      <Alert status="info">
        <AlertIcon />
        {infoTxt}
      </Alert>
      <Text>問題の形式</Text>
      <RadioGroup>
        <Stack direction="row" bgColor={'blue.100'} defaultValue="forms">
          <Radio
            value="1"
            onChange={() => {
              setQuestionType('forms')
              createPreview(setting, inputEl)
              setInfoTxt('問題形式を変更しました：' + setting.questionType)
            }}
          >
            MS-Forms
          </Radio>
          <Radio
            value="2"
            onChange={() => {
              setQuestionType('filling')
              createPreview(setting, inputEl)
              setInfoTxt('問題形式を変更しました：' + setting.questionType)
            }}
          >
            穴埋め問題
          </Radio>
          <Radio
            value="3"
            onChange={() => {
              setQuestionType('forms')
              createPreview(setting, inputEl)
              setInfoTxt('問題形式を変更しました：' + setting.questionType)
            }}
          >
            準備中
          </Radio>
        </Stack>
      </RadioGroup>
      <Text>改行の種類</Text>
      <RadioGroup>
        <Stack direction="row" bgColor={'blue.100'}>
          <Radio
            value="1"
            onChange={() => {
              setNewLine(1)
              createPreview(setting, inputEl)
              setInfoTxt('改行の種類が変更されました：/\n/g')
            }}
          >
            \n
          </Radio>
          <Radio
            value="2"
            onChange={() => {
              setNewLine(2)
              createPreview(setting, inputEl)
              setInfoTxt('改行の種類が変更されました：/\ns+/g')
            }}
          >
            \n\s+
          </Radio>
          <Radio
            value="3"
            onChange={() => {
              setNewLine(3)
              createPreview(setting, inputEl)
              setInfoTxt('改行の種類が変更されました：/s+/g')
            }}
          >
            その他
          </Radio>
          <Input
            placeholder="例) \n+\s*"
            width={'140px'}
            size="sm"
            variant="filled"
            onChange={() => checkForm(inputNewLine.current.value)}
            ref={inputNewLine}
          />
        </Stack>
      </RadioGroup>
      <Button onClick={onToggle}>詳細設定</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="blue.700"
          rounded="md"
          shadow="md"
        >
          <Text size={'xs'} ml="-4">
            ｛
          </Text>
          <Text size={'xs'}>
            detailInfo:<Code>{nl}</Code>,
          </Text>
          <Text size={'xs'}>questionImg:[],</Text>
          <Text size={'xs'} maxW="180px">
            questionSentence:
            <Input
              placeholder="例) ^\s*[1-9]\."
              width={'100px'}
              size="xs"
              variant="outline"
              onChange={() => {
                checkForm(inputQuestionStart.current.value)
              }}
              onBlur={() => {
                setQuestionStart(inputQuestionStart.current.value)
                setInfoTxt('questionSentenceの前区切り文字を変更しました。')
              }}
              ref={inputQuestionStart}
            />
            <Code>Aortaの...</Code>
            <Input
              placeholder="例) \([1-9]+点\)"
              width={'120px'}
              size="xs"
              variant="outline"
              onChange={() => checkForm(inputQuestionEnd.current.value)}
              ref={inputQuestionEnd}
            />
            ,
          </Text>
          <Text size={'xs'} maxW="180px">
            choices:［
            <Input
              placeholder="例) [a-z]\."
              width={'80px'}
              size="xs"
              variant="outline"
              onChange={() => checkForm(inputChoiceStart.current.value)}
              ref={inputChoiceStart}
            />
            <Code>選択肢１</Code>
            ,］,
          </Text>
          <Text size={'xs'}>answerImg:[],</Text>
          <Text size={'xs'}>
            answer:{' '}
            <Input
              placeholder="例) A."
              width={'80px'}
              size="xs"
              variant="outline"
              onChange={() => checkForm(inputAnswerStart.current.value)}
              ref={inputAnswerStart}
            />
            <Code>洞様毛細...</Code>
            <Input
              placeholder="例) [1-9]\."
              width={'80px'}
              size="xs"
              variant="outline"
              onChange={() => checkForm(inputAnswerEnd.current.value)}
              ref={inputAnswerEnd}
            />
            ,
          </Text>
          <Text size={'xs'}>commentary:'',</Text>
          <Text ml={-2} size={'xs'}>
            ｝,
          </Text>
        </Box>
      </Collapse>
    </>
  )
}
