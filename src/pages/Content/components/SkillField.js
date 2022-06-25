import { x } from '@xstyled/styled-components'

export const Skill = (props) => (
  <x.div
    m="16px 32px 0 0"
    border="solid 1px"
    borderColor="#e0ded9"
    p={0}
    h="35px"
    borderRadius="6px"
    display="flex"
    {...props}
  />
)

export const SkillTitle = (props) => (
  <x.div
    backgroundColor="#0f6378"
    color="white"
    borderRadius="6px 0 0 6px"
    p="5px 10px 7px"
    h="35px"
    mt="-1px"
    ml="-1px"
    {...props}
  />
)

export const SkillDescription = ({ children, ...props }) =>
  children ? (
    <x.div p="4px 7px" borderLeft="1px solid #e0ded9" {...props}>
      {children}
    </x.div>
  ) : null
