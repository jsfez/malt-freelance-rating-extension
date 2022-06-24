import styled from '@xstyled/styled-components'

export const Label = styled.label`
  display: block;
  margin: 1 0.5;
  font-size: xs;
  font-weight: bold;
  display: flex;
  gap: 1;
`

export const Input = styled.input`
  width: calc(100% - 1.5rem);
  height: 6;
  cursor: default;
  background-color: gray-100;
  padding: 0 3;
  font-size: 14;
  line-height: 16px;
  border-radius: md;
  border-width: 0;

  &:hover {
    background-color: background-hover;
  }

  &[aria-disabled='true'] {
    opacity: 0.5;
  }

  &:focus-visible,
  &[data-focus-visible] {
    outline: 2px solid;
    outline-color: primary-a20;
  }
`
