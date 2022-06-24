import { x } from '@xstyled/styled-components'

export const Title = (props) => (
  <x.div fontSize="lg" my={1} fontWeight="medium" {...props} />
)

export const Subtitle = (props) => (
  <x.div my={1} fontSize="xs" fontWeight="bold" {...props} />
)
