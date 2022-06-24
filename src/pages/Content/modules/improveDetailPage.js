import { getProfile } from '../../../services/storage'
import { createFieldDiv } from './components/fieldDiv'
import { createStatusButton, handleClick } from './components/statusButton'
import { createLinkedinButton } from './components/LinkedinButton'
import { createFlexDiv } from './components/flexDiv'

function getDiplomaField(educationYears) {
  if (educationYears.length === 0) return

  return educationYears.find((year) => isNaN(year))
    ? createFieldDiv('Diplome', 'en cours')
    : createFieldDiv('Diplomé en', Math.max(...educationYears))
}

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
  const techoListXP = {}

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
      if (techoListXP[technoTag]) {
        techoListXP[technoTag] += monthsDuration
        return
      }
      techoListXP[technoTag] = monthsDuration
    })
  })

  return techoListXP
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

function getTechnoTags(technoList, missionSections) {
  if (technoList.length === 0) return

  const missionsXP = getMissionsXP(missionSections)
  const skillList = getSkillList()
  const technoFieldsDiv = createFlexDiv()

  technoList.forEach((techno) => {
    technoFieldsDiv.append(
      createFieldDiv(
        techno,
        skillList[techno],
        formatDuration(missionsXP[techno]),
      ),
    )
  })
  return technoFieldsDiv
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

export async function improveDetailPage(searchKey, skills = []) {
  const {
    profileId,
    profileName,
    h1Wrapper,
    headerDiv,
    educationYears,
    missionSections,
    profileUrl,
  } = parsePage()

  const profile = await getProfile(profileId)

  const button = createStatusButton(profile?.[searchKey])
  button.addEventListener('click', (e) =>
    handleClick(e, profileId, searchKey, { url: window.location.pathname }),
  )
  h1Wrapper.style.alignItems = 'center'
  h1Wrapper.append(button)

  const linkedinButton = createLinkedinButton(profileName, profileUrl, skills)
  h1Wrapper.append(linkedinButton)

  const infoDiv = createFlexDiv()
  headerDiv.childNodes[1].style.height = 'auto'
  headerDiv.append(infoDiv)

  const diplomaField = getDiplomaField(educationYears)
  if (diplomaField) infoDiv.append(diplomaField)

  const technoTag = getTechnoTags(skills, missionSections)
  if (technoTag) infoDiv.append(technoTag)
}
