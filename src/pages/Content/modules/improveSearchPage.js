import { displayStore, getProfile } from '../../../services/storage'
import { createStatusButton, handleClick } from './components/statusButton'

function parseProfileCard(profileCard) {
  return {
    targetDiv: profileCard.querySelector('div.profile-card-body__header'),
    profileId: profileCard.getAttribute('data-id'),
    profileUrl: profileCard
      .querySelector('a')
      .href.replace(/\?.*$/, '')
      .replace(/https:\/\/www.malt.fr\/profile\//, '/profile/'),
  }
}

export async function diplayStatusOnSearchResults(searchKey) {
  Array.from(document.querySelectorAll('section.profile-card')).forEach(
    async (profileCard) => {
      const { targetDiv, profileId, profileUrl } = parseProfileCard(profileCard)

      let profile = await getProfile(profileId)
      const button = createStatusButton(profile?.[searchKey])

      button.addEventListener('click', async (e) => {
        await displayStore()
        handleClick(e, profileId, searchKey, { url: profileUrl })
      })

      targetDiv.style.flexDirection = 'row'
      targetDiv.style.justifyContent = 'space-between'
      targetDiv.append(button)
    },
  )
}
