import { diplayStatusOnSearchResults } from './modules/improveSearchPage'
import { improveDetailPage } from './modules/improveDetailPage'

async function improveMaltPages() {
  const url = window.location.href
  switch (true) {
    case /https:\/\/www.malt.fr\/s\?.*/.test(url):
      console.log('malt freelance rating: improve search page')
      return diplayStatusOnSearchResults()

    case /https:\/\/www.malt.fr\/profile.*/.test(url):
      console.log('malt freelance rating: improve profile page')
      return improveDetailPage()

    // case /https:\/\/www.malt.fr\/messages.*/.test(url):
    //   console.log('malt freelance rating: improve messages page')
    //   await displayStoreFreelancesButton()

    default:
      console.log('malt freelance rating : no feature for this url')
  }
}

async function main() {
  await improveMaltPages()
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.message === 'url updated') await improveMaltPages()
  return sendResponse('message received')
})

main()
