import { x } from '@xstyled/styled-components'

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

export function LinkedinButton({ profileName, profileUrl, skills, ...props }) {
  const nameParts = getNameParts(profileName, profileUrl)
  const queryParams = ['site%3Alinkedin.com', ...nameParts, ...skills]

  return (
    <x.a
      href={`https://www.google.com/search?q=+${queryParams.join('+')}`}
      color="secondary"
      mt="3px"
      fontSize="md"
      ml="4px"
      {...props}
    >
      Linkedin
    </x.a>
  )
}
