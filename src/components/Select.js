import styled from '@xstyled/styled-components'
import {
  Select as AriakitSelect,
  SelectItem as AriakitSelectItem,
  SelectLabel,
  SelectPopover as AriakitSelectPopover,
  useSelectState,
} from 'ariakit/select'

export { SelectLabel, useSelectState }

export const Select = styled(AriakitSelect)`
  width: 100%;
  display: flex;
  height: 8;
  cursor: default;
  align-items: center;
  justify-content: space-between;
  gap: 1;
  white-space: nowrap;
  background-color: white;
  padding: 0 2;
  font-size: 14;
  line-height: 14px;
  border-radius: md;
  border-width: 0;
  cursor: pointer;

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

export const SelectPopover = styled(AriakitSelectPopover)`
  max-height: min(var(--popover-available-height, 300px), 300px);
  z-index: 50;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overscroll-behavior: contain;
  border-radius: md;
  border-width: 1px;
  border-style: solid;
  border-color: border;
  background-color: true-gray-50;
  padding: 1;
  box-shadow: xl;

  $:focus-visible, $:[data-focus-visible] {
    outline: 2px solid;
    outline-color: primary-a20;
  }
`

export const SelectItem = styled(AriakitSelectItem)`
  outline: none;
  display: flex;
  cursor: default;
  scroll-margin: 2;
  align-items: center;
  gap: 2;
  border-radius: md;
  padding: 1 2;
  font-size: 14;
  line-height: 14px;
  cursor: pointer;

  &[data-active-item] {
    background-color: primary-a20;
  }

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
`
