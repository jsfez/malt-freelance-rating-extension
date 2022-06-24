import { x } from '@xstyled/styled-components'
import {} from 'react-icons/io5'
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectPopover,
  useSelectState,
} from './Select'
import { HiddenButton } from './Button'
import { Subtitle } from './Titles'

export { useSelectState }

export function HuntingSelect({ select, values = [], onAddList, ...props }) {
  return (
    <x.div display="flex" flexDirection="column" {...props}>
      <x.div display="flex" justifyContent="space-between">
        <Subtitle as={SelectLabel} state={select}>
          Hunting selection
        </Subtitle>
        <HiddenButton
          fontSize="sm"
          color={{ _: 'link', hover: 'link-hover' }}
          onClick={onAddList}
        >
          Add list
        </HiddenButton>
      </x.div>

      <Select state={select} />
      <SelectPopover state={select}>
        {values.map((value, index) => (
          <SelectItem key={index} value={value} />
        ))}
      </SelectPopover>
    </x.div>
  )
}
