import { createRoot } from 'react-dom/client'

export const TARGET_DOMAIN_REGEXP = /https:\/\/www.malt.fr.*/
export const TARGET_DOMAIN_URL_PATTERN = 'https://www.malt.fr/*'

export function getTodayDate() {
  return new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

export const getSearchKey = (search) => (search ? `search-${search.id}` : '')

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

export const getSearchSkills = (search = {}) =>
  (search.skills || '').split(', ').filter((e) => e)

export function getOrCreateChildDiv(targetNode, id) {
  if (id) {
    const child = targetNode.querySelector(`#${id}`)
    if (child) return child
  }

  const div = document.createElement('div')
  if (id) div.id = id
  targetNode.append(div)
  return div
}

export function renderReactNode(container, divId, reactNode) {
  const targetDiv = getOrCreateChildDiv(container, divId)
  const root = createRoot(targetDiv)
  root.render(reactNode)
}

export function sendMessageToTabs(
  message,
  urlPattern = TARGET_DOMAIN_URL_PATTERN,
) {
  chrome.tabs.query({ url: TARGET_DOMAIN_URL_PATTERN }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { message }, (response) =>
        console.log('response from page : ' + response),
      )
    })
  })
}
