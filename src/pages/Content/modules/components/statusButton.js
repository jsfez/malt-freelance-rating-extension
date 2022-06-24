import {
  getProfile,
  queryData,
  updateProfileStatus,
} from '../../../../services/storage'
import { shallowCompare } from '../../../../services/utils'

const defaultStatus = { color: '#ccc', comment: 'new', text: ' ' }

function updateButtonStatus(button, status = defaultStatus) {
  button.style.background = status.color
  button.title = status.comment
  button.innerHTML = status.text
}

async function getNextStatus(currentStatus) {
  const { status: statusList = [] } = await queryData('status')
  if (statusList.length === 0) return defaultStatus
  if (!currentStatus) return statusList[1]
  const index = statusList.findIndex((status) =>
    shallowCompare(status, currentStatus),
  )
  return statusList[(index + 1) % statusList.length]
}

export async function handleClick(e, profileId, searchKey, data = {}) {
  e.preventDefault()
  e.stopPropagation()

  const profile = await getProfile(profileId)
  const nextStatus = await getNextStatus(profile?.[searchKey])
  await updateProfileStatus(profileId, searchKey, nextStatus, {
    ...profile,
    ...data,
  })
  updateButtonStatus(e.target, nextStatus)
}

export function createStatusButton(status) {
  const button = document.createElement('button')
  button.style.cssText = `
    border-color: transparent;
    border-radius: 50%;
    margin: 3px 10px 0;
    width: 20px;
    min-width: 20px;
    height: 20px;
  `
  updateButtonStatus(button, status)
  return button
}
