import { queryData, seedStorage } from '../../services/storage'
import { seeds } from '../../seeds/data'
import {
  TARGET_DOMAIN_REGEXP,
  TARGET_DOMAIN_URL_PATTERN,
} from '../../services/utils'

chrome.runtime.onInstalled.addListener(async (details) => {
  const data = await queryData(null)
  if (!data?.searches?.length) await seedStorage(seeds)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const { url } = changeInfo
  if (!url || !TARGET_DOMAIN_REGEXP.test(url)) return

  chrome.tabs.query(
    { active: true, currentWindow: true, url: TARGET_DOMAIN_URL_PATTERN },
    (tabs) => {
      if (tab.length === 0) return

      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: 'url updated', url },
        (response) =>
          console.log('MFR - response from content script : ' + response),
      )
    },
  )
})
