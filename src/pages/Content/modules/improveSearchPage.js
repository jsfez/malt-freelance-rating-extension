import { StatusButton } from '../components/StatusButton'
import { getProfile, getSearch } from '../../../services/storage'
import { getSearchKey, renderReactNode } from '../../../services/utils'

function parseProfileCard(profileCard) {
  return {
    targetDiv: profileCard.querySelector('div.profile-card-body__header'),
    profileName: profileCard.querySelector(
      'div.profile-card-header__full-name',
    ),
    profileId: profileCard.getAttribute('data-id'),
    profileUrl: profileCard
      .querySelector('a')
      .href.replace(/\?.*$/, '')
      .replace(/https:\/\/www.malt.fr\/profile\//, '/profile/'),
  }
}

export async function diplayStatusOnSearchResults() {
  const search = await getSearch()
  const searchKey = getSearchKey(search)

  await Array.from(document.querySelectorAll('section.profile-card')).forEach(
    async (profileCard) => {
      const { targetDiv, profileId, profileUrl, profileName } =
        parseProfileCard(profileCard)
      const profile = await getProfile(profileId)

      targetDiv.style.flexDirection = 'row'
      targetDiv.style.justifyContent = 'space-between'

      renderReactNode(
        targetDiv,
        `status-button-container-${profileId}`,
        <StatusButton
          profile={profile}
          searchKey={searchKey}
          dataToStore={{ url: profileUrl, name: profileName }}
        />,
      )
    },
  )
}
