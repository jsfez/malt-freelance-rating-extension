import styled, { up } from '@xstyled/styled-components'
import {
  Dialog as AriakitDialog,
  DialogDismiss as AriakitDialogDismiss,
  useDialogState,
} from 'ariakit/dialog'
import { css } from 'styled-components'

export { useDialogState }

export const DialogDismiss = styled(AriakitDialogDismiss)`
  height: 5;
  width: 5;
  text-align: center;

  background-color: inherit;
  padding: 0 1 0 1;
  color: black;
  border: 0;
  border-radius: md;

  &:hover {
    background-color: hsla(204, 10%, 87%, 50%);
  }

  &:focus-visible,
  &[data-focus-visible] {
    outline: 2px solid;
    outline-color: primary-a10;
    outline-offset: 2px;
  }
`

export const Dialog = styled(AriakitDialog)`
  max-width: calc(100% - 32px);
  max-height: calc(100% - 32px);
  transform: translate(-50%, -50%);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  width: 100%;
  overflow: auto;
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: border;
  background-color: true-gray-50;
  padding: 2 2;
  box-shadow: xl;

  &:focus-visible,
  &[data-focus-visible] {
    outline: 2px solid;
    outline-color: primary-a20;
    outline-offset: 2px;
  }

  ${up(
    'md',
    css`
      margin-left: calc(var(--scrollbar-width, 0) * -0.5);
      width: 480px;
    `,
  )}
`
