const getProfileKey = (profileId) =>
  profileId ? `new-malt-profile-${profileId}` : ''

function slugify(string) {
  if (!string) return ''

  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

async function getAllStoredData() {
  return chrome.storage.sync.get(null)
}

async function getStatusList() {
  const { status } = await chrome.storage.sync.get(['status'])
  return status
}

async function getCurrentSearch() {
  const { searches } = await chrome.storage.sync.get('searches')
  return searches.find(({ selected }) => selected)
}

async function getContactedProfileLinks() {
  const { contactedProfileLinks } = await chrome.storage.sync.get(
    'contactedProfileLinks',
  )
  return contactedProfileLinks
}

async function storeContactedProfileLinks(profileLinks) {
  return chrome.storage.sync.set({ contactedProfileLinks: profileLinks })
}

async function getProfile(profileId) {
  const profileKey = getProfileKey(profileId)
  const res = await chrome.storage.sync.get([profileKey])
  return res[profileKey]
}

async function updateProfileStatus(profileId, searchName, status, data = {}) {
  const profileKey = getProfileKey(profileId)
  const newProfile = { ...data, id: profileId, [searchName]: status }
  await chrome.storage.sync.set({ [profileKey]: newProfile })
  return newProfile
}
