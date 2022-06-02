import {
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
export const Settings = ({
  inputEl,
  setNewLine,
  setQuestionType,
  showSetting,
  createPreview,
}) => {
  const [infoTxt, setInfoTxt] = useState()
  const setting = showSetting()
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
            /\n/g
          </Radio>
          <Radio
            value="2"
            onChange={() => {
              setNewLine(2)
              createPreview(setting, inputEl)
              setInfoTxt('改行の種類が変更されました：/\ns+/g')
            }}
          >
            /\n\s+/g
          </Radio>
          <Radio
            value="3"
            onChange={() => {
              setNewLine(3)
              createPreview(setting, inputEl)
              setInfoTxt('改行の種類が変更されました：/s+/g')
            }}
          >
            /\s+/g
          </Radio>
        </Stack>
      </RadioGroup>
    </>
  )
}
