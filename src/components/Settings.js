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
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
export const Settings = ({
  inputEl,
  setNewLine,
  setQuestionType,
  showSetting,
  createPreview,
  setQuestionStart,
  setQuestionEnd,
  setChoiceStart,
  setAnswerStart,
  setAnswerEnd,
  setBrackets,
  toggleCustomCheck,
}) => {
  const { isOpen, onToggle } = useDisclosure()
  const [customOpen, setCustomOpen] = useState(false)
  const inputNewLine = useRef()
  const inputAnswerEnd = useRef()
  const inputAnswerStart = useRef()
  const inputChoiceStart = useRef()
  const inputChoiceEnd = useRef()
  const inputQuestionEnd = useRef()
  const inputQuestionStart = useRef()
  const inputBrackets = useRef()
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
        <Stack
          direction="row"
          bgColor={'blue.100'}
          defaultValue="forms"
          value={setting.questionType}
        >
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
          <Tooltip
            hasArrow
            label="穴埋めによってreplaceされる文字列の正規表現を記入"
            size={'xs'}
          >
            <Input
              placeholder="例) （.+?）"
              width={'140px'}
              size="sm"
              variant="filled"
              onChange={() => {
                checkForm(inputBrackets.current.value)
              }}
              onBlur={() => setBrackets(inputBrackets.current.value0)}
              ref={inputBrackets}
            />
          </Tooltip>

          <Radio
            value="3"
            onChange={() => {
              setCustomOpen(true)
              setQuestionType('custom')
              createPreview(setting, inputEl)
              setInfoTxt('問題形式を変更しました：' + setting.questionType)
            }}
          >
            カスタマイズ
          </Radio>
        </Stack>
      </RadioGroup>
      <Modal isOpen={customOpen} onClose={() => setCustomOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CUSTOM</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup defaultValue={['sentence']}>
              <Stack spacing={2} direction="column">
                <Checkbox
                  value="sentence"
                  onChange={() => toggleCustomCheck('sentence')}
                  colorScheme="blue"
                  isDisabled
                >
                  questionSentence
                </Checkbox>
                <Checkbox
                  value="choices"
                  onChange={() => toggleCustomCheck('choices')}
                  colorScheme="blue"
                >
                  choices
                </Checkbox>
                <Checkbox
                  value="answer"
                  onChange={() => toggleCustomCheck('answer')}
                  colorScheme="red"
                >
                  answer
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => setCustomOpen(false)}
            >
              決定
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
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
                setInfoTxt(
                  'questionSentenceの前区切り文字を変更しました。' +
                    setting.questionStart,
                )
              }}
              ref={inputQuestionStart}
            />
            <Code>Aortaの...</Code>
            <Input
              placeholder="例) \([1-9]+点\)"
              width={'120px'}
              size="xs"
              variant="outline"
              onChange={() => {
                checkForm(inputQuestionEnd.current.value)
              }}
              onBlur={() => {
                setQuestionEnd(inputQuestionEnd.current.value)
                setInfoTxt(
                  'questionSentenceの後区切り文字を変更しました:' +
                    setting.questionEnd,
                )
              }}
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
              onBlur={() => {
                setChoiceStart(inputChoiceStart.current.value)
                setInfoTxt(
                  'choicesの前区切り文字を変更しました:' + setting.choiceStart,
                )
              }}
              ref={inputChoiceStart}
            />
            <Code>選択肢１</Code>
            ,］,
          </Text>
          <Text size={'xs'}>answerImg:[],</Text>
          <Text size={'xs'}>
            answer:''
            <Input
              placeholder="例) A."
              width={'80px'}
              size="xs"
              variant="outline"
              onChange={() => checkForm(inputAnswerStart.current.value)}
              onBlur={() => {
                setAnswerStart(inputAnswerStart.current.value)
                setInfoTxt(
                  'answerの前区切り文字を変更しました:' + setting.answerStart,
                )
              }}
              ref={inputAnswerStart}
            />
            <Code>洞様毛細...</Code>
            <Input
              placeholder="例) [1-9]\."
              width={'80px'}
              size="xs"
              variant="outline"
              onChange={() => checkForm(inputAnswerEnd.current.value)}
              onBlur={() => {
                setAnswerEnd(inputAnswerEnd.current.value)
                setInfoTxt(
                  'answerの後区切り文字を変更しました:' + setting.answerEnd,
                )
              }}
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
