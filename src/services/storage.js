import {
  chunkObject,
  delay,
  getProfileKey,
  getSearchKey,
  isEmptyObject,
  sendMessageToTabs,
} from './utils'

function reachableStorage() {
  if (chrome.storage) return true
  console.error('Storage not accessible')
  return false
}

export async function queryData(fields) {
  if (!reachableStorage()) return {}
  return chrome.storage.sync.get(fields)
}

export async function getProfile(profileId) {
  const profileKey = getProfileKey(profileId)
  const data = await queryData(profileKey)
  return { ...data[profileKey], id: profileId }
}

export async function getSearch() {
  const { searches = [], currentSearchIndex = 0 } = await queryData([
    'searches',
    'currentSearchIndex',
  ])
  return searches[currentSearchIndex] || {}
}

export async function displayStore() {
  const storeContent = await queryData(null)
  console.log({ storeContent })
}

export async function storeData(obj) {
  if (isEmptyObject(obj)) return
  if (!reachableStorage()) return
  await chrome.storage.sync.set(obj)
}

export async function updateProfileStatus(
  profileId,
  searchKey,
  status,
  data = {},
) {
  const newProfile = {
    [getProfileKey(profileId)]: { ...data, id: profileId, [searchKey]: status },
  }
  await storeData(newProfile)
  return newProfile
}

export async function removeData(list) {
  if (!reachableStorage()) return
  await chrome.storage.sync.remove(list)
}

function logRemainingTime(taskCount, delay) {
  const remainingSeconds = taskCount * delay

  console.log(
    `${taskCount} queries. Remaining time: ${Math.floor(
      remainingSeconds / 60,
    )}min ${remainingSeconds % 60} sec.`,
  )
}

export async function seedStorage(seeds) {
  const delaySeconds = 35
  const { searches = [], currentSearchIndex = 0, status, ...profiles } = seeds
  const profilesChunks = chunkObject(profiles, 100)
  const dataList = [
    { status, currentSearchIndex, searches },
    ...Object.keys(profilesChunks).map((profilesChunk) => ({
      ...profilesChunks[profilesChunk],
    })),
  ]

  if (!reachableStorage()) return
  console.log('malt Freelance Rating : Clear and populate storage.')
  logRemainingTime(dataList.length, delaySeconds)

  await chrome.storage.sync.clear()

  let i = 0
  for (let data of dataList) {
    const remainingTask = dataList.length - i
    await storeData(data)
    await displayStore()

    const storeContent = await queryData(null)
    console.log(
      `malt Freelance Rating : storeContent: ${
        Object.keys(storeContent).length
      } entries`,
    )
    console.log(storeContent)

    if (remainingTask !== 0) {
      await delay(delaySeconds)
      logRemainingTime(remainingTask, delaySeconds)
    }
    i += 1
  }

  return seeds
}

function trimSearchFromProfiles(profiles, searchId) {
  const removedProfilesKeys = []

  const newProfiles = Object.keys(profiles).reduce((res, key) => {
    const profile = { ...profiles[key] }
    delete profile[getSearchKey({ id: searchId })]

    if (!Object.keys(profile).join('-').includes('search')) {
      removedProfilesKeys.push(key)
      return res
    }

    return { ...res, [key]: profile }
  }, {})

  return { removedProfilesKeys, newProfiles }
}

export async function deleteSearch(data, searchIndex) {
  const { searches = [], currentSearchIndex = 0, status, ...profiles } = data
  const searchId = searches[searchIndex].id
  const newSearches = searches.filter((search, index) => index !== searchIndex)
  const { removedProfilesKeys, newProfiles } = trimSearchFromProfiles(
    profiles,
    searchId,
  )

  const newSearchIndex =
    searchIndex !== currentSearchIndex ? currentSearchIndex : 0

  await storeData({
    searches: newSearches,
    currentSearchIndex: newSearchIndex,
    ...newProfiles,
  })
  await removeData(removedProfilesKeys)
  if (newSearchIndex !== searchIndex) sendMessageToTabs('hunting list updated')

  return {
    searches: newSearches,
    currentSearchIndex: newSearchIndex,
    status,
    ...newProfiles,
  }
}
