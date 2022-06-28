import styled, { x } from '@xstyled/styled-components'
import { IoSearchOutline } from 'react-icons/io5'

const isAliasName = (profileName) => profileName.match(/\.$/) !== null

const removeSpecialChars = (str) =>
  str.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const extractSurname = (profileUrl, firstname) => {
  const surnameMatch = profileUrl?.match(`${firstname}(.*)`)
  if (!surnameMatch) return null
  return surnameMatch[1]
}

function getNameParts(profileName, profileUrl) {
  if (!isAliasName(profileName)) return [profileName]
  const firstname = removeSpecialChars(
    profileName.split(' ').slice(0, -1).join('').toLowerCase(),
  )
  const surname = extractSurname(profileUrl, firstname)
  if (!surname) return [profileName]
  return [firstname, surname].filter((e) => e).map((str) => capitalize(str))
}

const Link = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

const Button = styled.button`
  font-size: 16px;
  color: #014554;
  padding: 3px 6px;
  border: 0;
  border-radius: 6px;
  align-items: center;
  display: flex;
  gap: 5px;
  background-color: #ecf3f4;

  &:hover {
    background-color: #ccc;
    text-decoration: none;
  }
`

export function LinkedinButton({ profileName, profileUrl, skills, ...props }) {
  const nameParts = getNameParts(profileName, profileUrl)
  const queryParams = ['site%3Alinkedin.com', ...nameParts, ...skills]

  return (
    <Link
      href={`https://www.google.com/search?q=+${queryParams.join('+')}`}
      target="_blank"
      {...props}
    >
      <Button>
        Linkedin
        <x.span as={IoSearchOutline} />
      </Button>
    </Link>
  )
}
