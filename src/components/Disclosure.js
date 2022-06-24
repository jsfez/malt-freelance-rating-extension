import { x } from '@xstyled/styled-components'
import {
  Disclosure as AriakitDisclosure,
  DisclosureContent,
  useDisclosureState,
} from 'ariakit'

export function Disclosure({ title, body, ...props }) {
  const disclosure = useDisclosureState()

  return (
    <x.div {...props}>
      <AriakitDisclosure state={disclosure}>{title}</AriakitDisclosure>
      <DisclosureContent state={disclosure}>{body}</DisclosureContent>
    </x.div>
  )
}
