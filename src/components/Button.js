import styled, { x } from '@xstyled/styled-components'
import { Button as AriakitButton } from 'ariakit'

const BaseButton = styled(AriakitButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: md;
  border-style: none;
  alignself: center;
  cursor: pointer;

  &:focus-visible,
  &[data-focus-visible] {
    outline: 2px solid;
    outline-color: primary-a10;
    outline-offset: 2px;
  }

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
`

export const Button = styled(BaseButton)`
  height: 6;
  gap: 1;
  background-color: primary;
  padding: 0 4;
  font-size: 14;
  line-height: 16px;
  color: white;

  &:hover {
    background-color: primary-a80;
  }
`

export const SecondaryButton = styled(Button)`
  background-color: gray-200;
  color: black;

  &:hover {
    background-color: gray-300;
  }
`

export const HiddenButton = (props) => (
  <x.div
    as={BaseButton}
    display="flex"
    alignItems="center"
    background="transparent"
    border={0}
    p={0}
    m={0}
    borderRadius="md"
    cursor="pointer"
    {...props}
  />
)

export const SmallButton = (props) => (
  <HiddenButton
    px={2}
    py="1px"
    backgroundColor={{ _: 'gray-300', hover: 'gray-200' }}
    {...props}
  />
)
