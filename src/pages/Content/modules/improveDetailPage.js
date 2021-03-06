import { x } from '@xstyled/styled-components'
import { getProfile, getSearch } from '../../../services/storage'
import {
  getSearchKey,
  getSearchSkills,
  renderReactNode,
} from '../../../services/utils'
import { StatusButton } from '../components/StatusButton'
import { LinkedinButton } from '../components/LinkedinButton'
import { DiplomaField } from '../components/DiplomaField'
import { Skill, SkillDescription, SkillTitle } from '../components/SkillField'

function getFrenchLevel(level) {
  switch (level.toLowerCase()) {
    case 'none':
      return 'oui'
    case 'beginner':
      return 'débutant'
    case 'intermediate':
      return 'intermédiaire'
    case 'advanced':
      return 'avancé'
    default:
      return 'nouveau statut'
  }
}

function getSkillList() {
  const skillsString = document
    .querySelector('#profileSkillsSection')
    .getAttribute('data-js')
  const skillsJson = JSON.parse(skillsString.replace(/'/g, '"'))
  return skillsJson['profile-skills-view'].skillsView?.skills.reduce(
    (res, { label, level }) => ({
      ...res,
      [label.toLowerCase().replace(/.js/, '')]: getFrenchLevel(level),
    }),
    {},
  )
}

function getMissionsXP(missionSections) {
  const skillsXpDuration = {}

  // eslint-disable-next-line array-callback-return
  Array.from(missionSections).map((section) => {
    const duration = section.querySelector('[data-experience-date]').innerText
    const yearsMatch = duration.match(/(\d+) an?/)
    const monthsMatch = duration.match(/(\d+) mois/)
    const monthsDuration =
      parseInt(monthsMatch ? monthsMatch[1] : 0) +
      parseInt(yearsMatch ? yearsMatch[1] * 12 : 0)

    const technoTagDivs = [...section.querySelectorAll('[data-tag]')].map(
      (technoTagDiv) => technoTagDiv.innerText.toLowerCase().replace('.js', ''),
    )

    technoTagDivs.forEach((technoTag) => {
      if (skillsXpDuration[technoTag]) {
        skillsXpDuration[technoTag] += monthsDuration
        return
      }
      skillsXpDuration[technoTag] = monthsDuration
    })
  })

  return skillsXpDuration
}

function formatDuration(monthCount) {
  const years = Math.floor(monthCount / 12)
  const months = monthCount - years * 12
  return [
    years > 1 ? `${years} ans` : years ? '1 an' : '',
    months ? `${months} mois` : '',
  ]
    .filter((e) => e)
    .join(' et ')
}

function SkillTags({ skills, missionSections }) {
  if (skills.length === 0) return

  const missionsXP = getMissionsXP(missionSections)
  const skillList = getSkillList()

  return skills.map((skill, index) => (
    <Skill>
      <SkillTitle>{skill}</SkillTitle>
      <SkillDescription>{skillList[skill]}</SkillDescription>
      <SkillDescription>{formatDuration(missionsXP[skill])}</SkillDescription>
    </Skill>
  ))
}

function parsePage() {
  return {
    profileId: document
      .querySelector(
        'div.profile-header__freelancer-info-wrapper button[data-profileid]',
      )
      .getAttribute('data-profileid'),
    profileName: document
      .querySelector('h1')
      .innerText.replace(/\n/g, '')
      .trim()
      .replace(/\s+/g, ' '),
    h1Wrapper: document.querySelector('#profileHeaderMainInfos div'),
    educationYears: Array.from(
      document.querySelectorAll('[data-education-year]'),
    ).map(({ innerText }) => innerText),
    missionSections: document.querySelectorAll('#experiencesContent section'),
    headerDiv: document.querySelector('#profileHeaderMainInfos div').parentNode
      .parentNode.parentNode.parentNode.parentNode,
    profileUrl: document
      .querySelector('li[data-js="copy-content-to-clipboard"] input')
      .getAttribute('value'),
  }
}

export async function improveDetailPage() {
  const {
    profileId,
    profileName,
    h1Wrapper,
    headerDiv,
    educationYears,
    missionSections,
    profileUrl,
  } = parsePage()

  const search = await getSearch()
  const searchKey = getSearchKey(search)
  const skills = getSearchSkills(search)
  const profile = await getProfile(profileId)

  h1Wrapper.style.alignItems = 'center'

  renderReactNode(
    h1Wrapper,
    'profile-status',
    <x.div display="flex" alignItems="center" gap="12px">
      <StatusButton
        profile={profile}
        searchKey={searchKey}
        dataToStore={{ url: window.location.pathname, name: profileName }}
      />
      <LinkedinButton
        profileName={profileName}
        profileUrl={profileUrl}
        skills={skills}
      />
    </x.div>,
  )

  headerDiv.childNodes[1].style.height = 'auto'

  renderReactNode(
    headerDiv,
    'skills',
    <x.div display="flex" pt="16px" gap="32px">
      <DiplomaField educationYears={educationYears} />
      <SkillTags skills={skills} missionSections={missionSections} />
    </x.div>,
  )
}
