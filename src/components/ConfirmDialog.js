import { x } from '@xstyled/styled-components'
import { Button, SecondaryButton } from './Button'
import { Dialog, DialogDismiss } from './Dialog'

export function ConfirmDialog({
  dialog,
  children,
  confirmLabel = 'Confirm',
  onConfirm,
  ...props
}) {
  return (
    <Dialog state={dialog}>
      <x.div display="flex" justifyContent="flex-end">
        <DialogDismiss />
      </x.div>
      <x.div mt={1} mb={6}>
        {children}
      </x.div>
      <x.div display="flex" justifyContent="flex-end" gap={2}>
        <SecondaryButton onClick={dialog.hide}>Cancel</SecondaryButton>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </x.div>
    </Dialog>
  )
}
