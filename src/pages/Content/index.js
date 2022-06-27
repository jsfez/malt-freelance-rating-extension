import { diplayStatusOnSearchResults } from './modules/improveSearchPage'
import { improveDetailPage } from './modules/improveDetailPage'

async function improveMaltPages() {
  const url = window.location.href
  switch (true) {
    case /https:\/\/www.malt.fr\/s\?.*/.test(url):
      console.log('MFR : improve search results')
      return diplayStatusOnSearchResults()

    case /https:\/\/www.malt.fr\/profile.*/.test(url):
      console.log('MFR : improve profile page')
      return improveDetailPage()

    // case /https:\/\/www.malt.fr\/messages.*/.test(url):
    //   console.log('MFR : improve messages page')
    //   await displayStoreFreelancesButton()

    default:
  }
}

async function main() {
  await improveMaltPages()
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const triggerMessages = ['hunting list updated', 'url updated']

  if (!triggerMessages.includes(request.message)) {
    sendResponse('unknown message received')
    return true
  }
  improveMaltPages().then(() => sendResponse('trigger message received'))
  return true
})

main()
