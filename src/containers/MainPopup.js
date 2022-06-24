/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { HiddenButton } from '../components/Button'
import { Brand } from '../components/Brand'
import { Popup, PopupHeader } from '../components/Popup'
import { Home } from './Home'
import { Settings } from './Settings'
import { seeds } from '../seeds/data'
import { displayStore, queryData, seedStorage } from '../services/storage'
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
  const [data, setData] = useState()
  const useEffectLimitator = 'lorem'

  useEffect(() => {
    async function fetchSearches() {
      let response = await queryData(null)
      if (
        isEmptyObject(response) ||
        !response.searches ||
        response.searches.length === 0
      ) {
        response = await seedStorage(seeds)
      }
      await displayStore()
      setData({ ...data, ...response })
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
