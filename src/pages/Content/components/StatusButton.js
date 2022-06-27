import { useState } from 'react'
import { x } from '@xstyled/styled-components'
import { queryData, updateProfileStatus } from '../../../services/storage'
import { compareStatus, DEFAULT_STATUS } from '../../../services/utils'

function getNextStatusIndex(statusList = [], currentStatus) {
  if (!currentStatus) return 1
  const index = statusList.findIndex((status) =>
    compareStatus(status, currentStatus),
  )
  return (index + 1) % statusList.length
}

async function getNextStatus(currentStatus) {
  const { status: statusList = [] } = await queryData('status')
  if (statusList.length === 0) return DEFAULT_STATUS
  const nextStatusIndex = getNextStatusIndex(statusList, currentStatus)
  return statusList[nextStatusIndex]
}

export function StatusButton({ profile, searchKey, dataToStore = {}, props }) {
  const [status, setStatus] = useState(profile[searchKey] || DEFAULT_STATUS)

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
