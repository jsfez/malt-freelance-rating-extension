import styled, { x } from '@xstyled/styled-components'

export const ListItem = ({ secondary, ...props }) => (
  <x.div
    py={1}
    px={3}
    display="flex"
    flexDirection="column"
    gap={1}
    borderBottom={1}
    borderColor="border"
    backgroundColor={secondary ? 'secondary-background' : 'white'}
    {...props}
  />
)

export const List = styled.box`
  display: flex;
  flex-direction: column;

  & > *:first-of-type {
    border-top-left-radius: md;
    border-top-right-radius: md;
  }

  & > *:last-of-type {
    border-bottom-left-radius: md;
    border-bottom-right-radius: md;
    border: 0;
  }
`
