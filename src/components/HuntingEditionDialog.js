import { useEffect, useState } from 'react'
import { x } from '@xstyled/styled-components'
import { Button, SecondaryButton } from './Button'
import { Dialog, DialogDismiss } from './Dialog'
import { FieldGroup } from './FieldGroup'
import { Input, Label } from './Input'
import { Title } from './Titles'
import { isEmptyObject } from '../services/utils'

export function HuntingEditionDialog({ dialog, search, status, onSave }) {
  const [data, setData] = useState(search)

  useEffect(() => {
    setData(search)
  }, [search])

  function handleCancel() {
    setData(search)
    dialog.hide()
  }

  return (
    <Dialog state={dialog}>
      <x.div display="flex" justifyContent="space-between">
        <Title>{isEmptyObject(search) ? 'Add list' : 'Edit list'}</Title>
        <DialogDismiss />
      </x.div>

      <FieldGroup>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={data.name || ''}
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="skills">
          Skills{' '}
          <x.div fontSize="xs" color="gray-400">
            (values separated by ",")
          </x.div>{' '}
        </Label>
        <Input
          id="skills"
          value={data.skills || ''}
          onChange={(e) =>
            setData((prev) => ({ ...prev, skills: e.target.value }))
          }
        />
      </FieldGroup>

      <x.div display="flex" justifyContent="flex-end" gap={2}>
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        <Button onClick={() => onSave(data)}>Save</Button>
      </x.div>
    </Dialog>
  )
}
