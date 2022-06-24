export function getTodayDate() {
  return new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

export const getSearchKey = (searchId) => (searchId ? `search-${searchId}` : '')

export const getProfileKey = (profileId) =>
  profileId ? `profile-${profileId}` : ''

export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0

export function chunkObject(object, size) {
  const entries = Object.entries(object)
  const chunks = []
  let i = 0
  while (i < entries.length) {
    chunks.push(Object.fromEntries(entries.slice(i, (i += size))))
  }
  return Object.assign({}, chunks)
}

export const delay = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

export function compareStatus(statusA, statusB) {
  return (
    statusA.text === statusB.text &&
    statusA.comment === statusB.comment &&
    statusA.color === statusB.color
  )
}

export const getSkillList = (search = {}) =>
  (search.skills || '').split(', ').filter((e) => e)

export function addDiv(targetNode) {
  const newDiv = document.createElement('div')
  targetNode.append(newDiv)
  return newDiv
}
