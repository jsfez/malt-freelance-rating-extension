import { x } from '@xstyled/styled-components'
import { Disclosure, DisclosureContent, useDisclosureState } from 'ariakit'
import { IoChevronDownOutline } from 'react-icons/io5'
import { Subtitle } from './Titles'
import { HiddenButton } from './Button'
import { Section } from './Section'
import { List, ListItem } from './List'
import { Link } from './Link'

function DisclosureButton({ children, state, ...props }) {
  return (
    <HiddenButton
      as={Disclosure}
      state={state}
      w={1}
      justifyContent="space-between"
      px={2}
      color={{ _: 'black', hover: 'link-hover' }}
      fontSize="sm"
      {...props}
    >
      <Subtitle mt={0}>{children}</Subtitle>
      <x.div
        as={IoChevronDownOutline}
        transform
        rotate={state.visible ? 0 : 180}
        mt="-4px"
      />
    </HiddenButton>
  )
}

export function CollapsableProfilesGroup({ profileGroup, title }) {
  const disclosure = useDisclosureState({ defaultVisible: true })

  return (
    <Section px={0} pb={0}>
      <DisclosureButton state={disclosure}>
        {title} ({profileGroup.length})
      </DisclosureButton>

      <DisclosureContent state={disclosure}>
        <List>
          {profileGroup.map(({ id, name, url }, index) => {
            return (
              <ListItem key={index} secondary={index % 2}>
                <Link href={`https://www.malt.fr${url}`} w={1}>
                  {name}
                </Link>
              </ListItem>
            )
          })}
        </List>
      </DisclosureContent>
    </Section>
  )
}

function groupBy(profileList, field) {
  return profileList.reduce(
    (res, profile) => ({
      ...res,
      [profile[field]]: res[profile[field]]
        ? [...res[profile[field]], profile]
        : [profile],
    }),
    {},
  )
}

function sortProfileGroups(profileGroups, status) {
  const statusRanks = status.reduce(
    (res, { comment, rank }) => ({
      ...res,
      [comment]: rank,
    }),
    {},
  )

  return Object.keys(profileGroups).sort((groupKeyA, groupKeyB) => {
    if (statusRanks[groupKeyA] && statusRanks[groupKeyB]) {
      return statusRanks[groupKeyB] - statusRanks[groupKeyA]
    }
    if (statusRanks[groupKeyA] && !statusRanks[groupKeyB]) return -1
    if (!statusRanks[groupKeyA] && statusRanks[groupKeyB]) return 1
    return groupKeyA.localeCompare(groupKeyB)
  })
}

export function ProfileLists({ profiles, status }) {
  const profileGroups = groupBy(profiles, 'status')
  const sortedGroupKeys = sortProfileGroups(profileGroups, status)

  return sortedGroupKeys.map((key, freelanceIndex) => (
    <CollapsableProfilesGroup
      key={freelanceIndex}
      profileGroup={profileGroups[key]}
      title={key}
    />
  ))
}
