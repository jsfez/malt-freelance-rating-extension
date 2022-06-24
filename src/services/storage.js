import {
  chunkObject,
  delay,
  getProfileKey,
  getSearchKey,
  isEmptyObject,
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
  const profile = await queryData()
  return profile[profileKey]
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
  const newProfile = { ...data, id: profileId, [searchKey]: status }
  await storeData({ [getProfileKey(profileId)]: newProfile })
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
    { status, currentSearchIndex },
    { searches },
    ...Object.keys(profilesChunks).map((profilesChunk) => ({
      ...profilesChunks[profilesChunk],
    })),
  ]

  if (!reachableStorage()) return
  console.log('Clear and populate storage.')
  logRemainingTime(dataList.length, delaySeconds)

  await chrome.storage.sync.clear()

  let i = 0
  for (let data of dataList) {
    const remainingTask = dataList.length - i
    await storeData(data)
    await displayStore()

    const storeContent = await queryData(null)
    console.log(`storeContent: ${Object.keys(storeContent).length} entries`)
    console.log(storeContent)

    if (remainingTask !== 0) {
      logRemainingTime(remainingTask, delaySeconds)
      await delay(delaySeconds)
    }
    i += 1
  }

  return seeds
}

function trimSearchFromProfiles(profiles, searchId) {
  const removedProfilesKeys = []

  const newProfiles = Object.keys(profiles).reduce((res, key) => {
    const profile = { ...profiles[key] }
    delete profile[getSearchKey(searchId)]

    if (!Object.keys(profile).join('-').includes('search')) {
      removedProfilesKeys.push(key)
      return res
    }

    return { ...res, [key]: profile }
  }, {})

  return { removedProfilesKeys, newProfiles }
}

export async function deleteSearch(data, searchId) {
  const { searches = [], currentSearchIndex = 0, status, ...profiles } = data

  const updatedSearchIndex =
    searchId !== currentSearchIndex
      ? currentSearchIndex
      : searches.find(({ id }) => id !== searchId).id
  const newSearches = searches.filter(({ id }) => id !== searchId)
  const { removedProfilesKeys, newProfiles } = trimSearchFromProfiles(
    profiles,
    searchId,
  )

  await storeData({
    searches: newSearches,
    currentSearchIndex: updatedSearchIndex,
    ...newProfiles,
  })
  await removeData(removedProfilesKeys)
  return {
    searches: newSearches,
    currentSearchIndex: updatedSearchIndex,
    status,
    ...newProfiles,
  }
}
