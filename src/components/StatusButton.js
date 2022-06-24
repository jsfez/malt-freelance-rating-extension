import { useState } from 'react'
import { x } from '@xstyled/styled-components'
import {
  getDefaultStatus,
  queryData,
  updateProfileStatus,
} from '../services/storage'
import { compareStatus } from '../services/utils'

const defaultStatus = getDefaultStatus()

async function getNextStatus(currentStatus) {
  const { status: statusList = [] } = await queryData('status')
  if (statusList.length === 0) return defaultStatus
  if (!currentStatus) return statusList[1]
  const index = statusList.findIndex((status) =>
    compareStatus(status, currentStatus),
  )
  const newStatus = statusList[(index + 1) % statusList.length]
  return newStatus
}

export function StatusButton({ profile, searchKey, dataToStore = {}, props }) {
  const [status, setStatus] = useState(profile?.[searchKey] || defaultStatus)

  async function handleClick(event) {
    event.preventDefault()
    event.stopPropagation()
    const nextStatus = await getNextStatus(status)
    await updateProfileStatus(profile.id, searchKey, nextStatus, {
      ...profile,
      ...dataToStore,
    })
    setStatus(nextStatus)
  }

  return (
    <x.button
      borderColor="transparent"
      borderRadius="50%"
      margin="3px 10px 0"
      w="20px"
      minWidth="20px"
      h="20px"
      background={status.color}
      title={status.comment}
      onClick={(event) => handleClick(event)}
      {...props}
    >
      {status.text}
    </x.button>
  )
}
