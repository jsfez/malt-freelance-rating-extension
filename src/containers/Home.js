import { x } from '@xstyled/styled-components'
import { displayStore, storeData } from '../services/storage'
import { useDialogState } from '../components/Dialog'
import { ProfileLists } from '../components/ProfileLists'
import { Section } from '../components/Section'
import { HuntingSelect, useSelectState } from '../components/HuntingSelect'
import { getSearchKey, getTodayDate } from '../services/utils'
import { HuntingEditionDialog } from '../components/HuntingEditionDialog'

function formatProfiles(search, profiles) {
  if (!search) return []
  const searchKey = getSearchKey(search)

  return Object.keys(profiles)
    .filter((key) => profiles[key][searchKey] && profiles[key].url)
    .map((key) => ({
      id: profiles[key].id,
      name:
        profiles[key].name || profiles[key].url?.replace('/profile/', '') || '',
      url: profiles[key].url || '',
      status: profiles[key][searchKey].comment,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function getNewSearchData(searches, newSearch) {
  const id = Math.max(...searches.map(({ id }) => id)) + 1

  return {
    searches: [
      ...searches,
      { ...newSearch, id, missionStartDate: getTodayDate() },
    ],
    currentSearchIndex: searches.length,
  }
}

const HuntingLists = (props) => (
  <x.div
    mt={1}
    ml={1}
    pl={2}
    borderLeft="1px dashed"
    borderColor="gray-400"
    overflowY="auto"
    flexGrow={1}
    {...props}
  />
)

export function Home({ data, setData }) {
  const { searches = [], currentSearchIndex = 0, status, ...profiles } = data
  const search = searches[currentSearchIndex] || {}
  const formatedProfiles = formatProfiles(search, profiles)

  const dialog = useDialogState()
  const select = useSelectState({
    defaultValue: 'First List',
    value: search?.name,
    sameWidth: true,
    gutter: 4,
    setValue: onSelectChange,
  })

  async function onSelectChange(huntingName) {
    const index = searches.findIndex((search) => search.name === huntingName)
    if (index !== -1) {
      storeData({ currentSearchIndex: index })
      setData((prev) => ({ ...prev, currentSearchIndex: index }))
    }
  }

  async function addList(newSearch) {
    const newData = getNewSearchData(searches, newSearch)
    await storeData({ ...data, ...newData })
    await displayStore()
    setData((prev) => ({ ...prev, ...newData }))
    dialog.toggle()
  }

  return (
    <>
      <HuntingSelect
        select={select}
        values={searches.map(({ name }) => name)}
        onAddList={dialog.toggle}
      />

      <HuntingLists>
        {formatedProfiles.length === 0 ? (
          <Section fontSize="sm">No freelance rated.</Section>
        ) : (
          <ProfileLists profiles={formatedProfiles} status={status} />
        )}
      </HuntingLists>

      <HuntingEditionDialog
        dialog={dialog}
        search={{}}
        status={status}
        onSave={addList}
      />
    </>
  )
}
