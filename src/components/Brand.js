import { x } from '@xstyled/styled-components'
import logo from '../img/logo.svg'

export const Brand = (props) => (
  <x.div display="flex" alignItems="center" gap={2} fontSize="xl" mt={-1}>
    <x.img src={logo} alt="logo" width={32} mt={1} />
    <x.span color="primary">malt</x.span> freelance rating
  </x.div>
)
