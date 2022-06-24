import { x } from '@xstyled/styled-components'

export const Popup = (props) => (
  <x.div
    w={280}
    h={430}
    maxHeight={430}
    fontSize="1rem"
    py={1}
    px={2}
    display="flex"
    flexDirection="column"
    {...props}
  />
)

export const PopupHeader = (props) => (
  <x.div
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mt={1}
    mb={2}
    {...props}
  />
)
