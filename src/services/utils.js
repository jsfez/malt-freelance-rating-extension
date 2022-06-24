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

export function shallowCompare(obj1, obj2) {
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every((key) => obj1[key] === obj2[key])
  )
}

export const getSkillList = (search = {}) =>
  (search.skills || '').split(', ').filter((e) => e)
