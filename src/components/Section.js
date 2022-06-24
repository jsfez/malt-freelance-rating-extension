import { x } from '@xstyled/styled-components'

export const Section = (props) => (
  <x.div
    bg="white"
    borderRadius="md"
    border={1}
    borderColor="border"
    py={1}
    px={2}
    my={1}
    {...props}
  />
)
