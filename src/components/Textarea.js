import styled from '@xstyled/styled-components'

export const Textarea = styled.textarea`
  width: calc(100% - 1rem);
  height: 10;
  cursor: default;
  background-color: gray-100;
  padding: 1 2;
  font-size: 14;
  line-height: 16px;
  border-radius: md;
  border-width: 0;
  font-family: inherit;

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
