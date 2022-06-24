const profileUseAlias = (profileName) => profileName.match(/\.$/) !== null

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const removeSpecialChars = (str) =>
  str.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')

const extractFirstname = (profileName) =>
  removeSpecialChars(profileName.split(' ').slice(0, -1).join('').toLowerCase())

const extractSurname = (profileUrl, firstname) => {
  const surnameMatch = profileUrl?.match(`${firstname}(.*)`)
  if (!surnameMatch) return null
  return surnameMatch[1]
}

function getNameParts(profileName, profileUrl) {
  const useAlias = profileUseAlias(profileName)
  if (!useAlias) return [profileName]

  const firstname = extractFirstname(profileName)
  const surname = extractSurname(profileUrl, firstname)

  if (!surname) return [profileName]

  return [firstname, surname].filter((e) => e).map((str) => capitalize(str))
}

export function createLinkedinButton(profileName, profileUrl, skills) {
  const button = document.createElement('button')
  button.style.cssText = `
    border-color: transparent;
    background: transparent;
    color: #0a66c2;
    margin-top: 3px;
  `
  button.innerHTML = 'Linkedin'

  const nameParts = getNameParts(profileName, profileUrl)
  const queryParams = ['site%3Alinkedin.com', ...nameParts, ...skills]
  const url = `https://www.google.com/search?q=+${queryParams.join('+')}`

  button.addEventListener('click', () => window.open(url))
  return button
}
