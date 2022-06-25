/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { HiddenButton } from '../components/Button'
import { Brand } from '../components/Brand'
import { Popup, PopupHeader } from '../components/Popup'
import { Home } from './Home'
import { Settings } from './Settings'
import { seeds } from '../seeds/data'
import { displayStore, queryData } from '../services/storage'
import { isEmptyObject } from '../services/utils'

function getViewComponent({ view, ...props }) {
  switch (view) {
    case 'settings':
      return <Settings {...props} />

    default:
      return <Home {...props} />
  }
}

export function MainPopup() {
  const [view, setView] = useState()
  const [data, setData] = useState(seeds)
  const useEffectLimitator = 'lorem'

  useEffect(() => {
    async function fetchSearches() {
      let data = await queryData(null)
      await displayStore()
      if (!isEmptyObject(data)) setData(data)
    }
    fetchSearches()
  }, [useEffectLimitator])

  return (
    <Popup>
      <PopupHeader>
        <Brand />

        {view === 'settings' ? (
          <HiddenButton
            onClick={() => setView('home')}
            color={{ _: 'link', hover: 'link-hover' }}
          >
            Done
          </HiddenButton>
        ) : (
          <HiddenButton
            as={IoSettingsOutline}
            onClick={() => setView('settings')}
            color={{ _: 'black', hover: 'link-hover' }}
          />
        )}
      </PopupHeader>
      {!isEmptyObject(data) && getViewComponent({ view, data, setData })}
    </Popup>
  )
}
