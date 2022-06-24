const profileLinks = []

function displayAllContactedFreelances() {
  const checkboxSelectors = [
    'input[name=conversationStatus][value=ARCHIVED]',
    'input[name=conversationStatus][value=ACTIVE]',
  ]

  checkboxSelectors.forEach((checkboxSelector) => {
    if (!document.querySelector(checkboxSelector).checked) {
      document.querySelector(checkboxSelector).click()
    }
  })
}

function focusProfile(profile) {
  profile.scrollIntoView()
  profile.click()
}

function getProfileItem(index) {
  const list = [...document.querySelectorAll('#messengerConversationList li')]
  return list[index * 2]
}

const observer = new MutationObserver((_, obs) => {
  const profileDetail = document.querySelector('joy-user-card')
  if (profileDetail) {
    profileLinks.push(profileDetail.getAttribute('link'))
    obs.disconnect()
    return
  }
})

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createButton(text) {
  const button = document.createElement('button')
  button.style.cssText = `
    color: #0a66c2;
    margin-top: 6px;
    padding: 6px;
    border-radius: 6px;
  `
  button.innerHTML = text
  return button
}

async function storeContactedFreelances() {
  let profileIndex = 0
  let profile = getProfile(profileIndex)

  while (profile) {
    focusProfile(profile)
    await sleep(500)
    observer.observe(document, { childList: true, subtree: true })
    profileIndex += 1
    profile = getProfileItem(profileIndex)
  }

  await storeContactedProfileLinks(profileLinks)
}

function displayStoreFreelancesButton() {
  const button = createButton(
    'Mettre à jour le statut des freelances contactés',
  )

  button.addEventListener('click', async () => {
    displayAllContactedFreelances()
    await storeContactedFreelances()
  })

  document
    .querySelector(
      'div.conversation-list-filters.conversation-list-loader__filters',
    )
    .append(button)
}
