import { queryData, seedStorage } from '../../services/storage'
import { seeds } from '../../seeds/data'

chrome.runtime.onInstalled.addListener(async (details) => {
  const data = await queryData(null)
  if (!data?.searches?.length) await seedStorage(seeds)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && /https:\/\/www.malt.fr.*/.test(changeInfo.url)) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: 'url updated', url: changeInfo.url },
        (response) => console.log(response),
      )
    })
  }
})
