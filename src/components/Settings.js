import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
export const Settings = ({ setNewLine }) => {
  return (
    <RadioGroup>
      <Stack direction="row" bgColor={'blue.100'}>
        <Radio value="1" onChange={() => setNewLine(1)}>
          First
        </Radio>
        <Radio value="2" onChange={() => setNewLine(2)}>
          Second
        </Radio>
        <Radio value="3" onChange={() => setNewLine(3)}>
          Third
        </Radio>
      </Stack>
    </RadioGroup>
  )
}
