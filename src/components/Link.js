import { x } from '@xstyled/styled-components'

export const Link = ({ url, ...props }) => (
  <x.a
    textDecoration="none"
    color={{ _: 'black', hover: 'link-hover' }}
    target="_blank"
    {...props}
  />
)
