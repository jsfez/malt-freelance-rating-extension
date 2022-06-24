import { x } from '@xstyled/styled-components'

export const Skill = (props) => (
  <x.div
    m="16px 32px 0 0"
    border="solid 1px"
    borderColor="border"
    padding="5px 5px 5px 0"
    borderRadius="6px"
    display="flex"
    {...props}
  />
)

export const SkillTitle = (props) => (
  <x.div
    backgroundColor="#0f6378"
    color="white"
    border="1px solid"
    borderColor="#0f6378"
    borderRadius="6px 0 0 6px"
    padding="4px 10px 7px"
    {...props}
  />
)

export const SkillDescription = ({ children, ...props }) =>
  children ? (
    <x.div p="5px" borderLeft="1px solid" borderColor="#ccc" {...props}>
      {children}
    </x.div>
  ) : null
