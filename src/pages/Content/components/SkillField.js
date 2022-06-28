import { x } from '@xstyled/styled-components'

export const Skill = (props) => (
  <x.div
    border="solid 1px"
    borderColor="#e0ded9"
    p={0}
    h="28px"
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
    p="2px 10px 7px"
    h="28px"
    mt="-1px"
    ml="-1px"
    {...props}
  />
)

export const SkillDescription = ({ children, ...props }) =>
  children ? (
    <x.div pt={2} px="7px" borderLeft="1px solid #e0ded9" {...props}>
      {children}
    </x.div>
  ) : null
