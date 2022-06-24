import { queryData } from '../../services/storage'
import { getSearchKey, getSkillList } from '../../services/utils'
import { diplayStatusOnSearchResults } from './modules/improveSearchPage'
import { improveDetailPage } from './modules/improveDetailPage'

async function improveMaltPages(url) {
  const data = await queryData(null)
  const { searches = [], currentSearchIndex = 0, status, ...profiles } = data
  const search = searches[currentSearchIndex] || {}
  const searchKey = getSearchKey(search.id)

  if (url.match(/https:\/\/www.malt.fr\/s\?/)) {
    console.log('malt Freelance Rating: improve search page')
    await diplayStatusOnSearchResults(searchKey)
    return
  }

  if (url.match(/https:\/\/www.malt.fr\/profile/)) {
    console.log('malt Freelance Rating: improve profile page')
    await improveDetailPage(searchKey, getSkillList(search))
    return
  }

  // if (url.match(/https:\/\/www.malt.fr\/messages/)) {
  //   console.log('malt Freelance Rating: improve messages page')
  //   await displayStoreFreelancesButton()
  //   return
  // }

  console.log('malt Freelance Rating : no matching loaded')
}

async function main() {
  await improveMaltPages(window.location.href)
}

main()
