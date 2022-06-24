import styled, { x } from '@xstyled/styled-components'
import { Button } from 'ariakit/button'

const InnerTag = styled.div`
  border: solid 1px;
  border-color: border;
  width: fit-content;
  padding: 2px 6px;
  background-color: secondary;
  color: white;
  border-radius: md;
  display: flex;
  white-space: nowrap;
  align-items: center;
  font-size: sm;
  gap: 2;
`

const CloseButton = (props) => (
  <x.div
    as={Button}
    backgroundColor="transparent"
    border="solid 1px white"
    borderRadius="50%"
    color="white"
    w={4}
    h={2}
    fontSize={12}
    p={0}
    display="flex"
    alignItems="center"
    justifyContent="center"
    pb="1px"
    {...props}
  />
)

export const Tags = (props) => (
  <x.div display="flex" gap={1} flexWrap="wrap" {...props} />
)

export function Tag({ children, handleClose, ...props }) {
  return (
    <InnerTag {...props}>
      {children}
      {handleClose ? <CloseButton onClick={handleClose}>x</CloseButton> : null}
    </InnerTag>
  )
}

export const TagList = ({ list = [], ...props }) => {
  if (list.length === 0) return null

  return (
    <Tags {...props}>
      {list
        .filter((e) => e)
        .map((item, index) => (
          <Tag key={index}>
            {item[0].toUpperCase() + item.slice(1).toLowerCase()}
          </Tag>
        ))}
    </Tags>
  )
}
