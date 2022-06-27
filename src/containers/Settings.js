import { useRef } from 'react'
import { x } from '@xstyled/styled-components'
import { Title } from '../components/Titles'
import { Section } from '../components/Section'
import { Button, SecondaryButton } from '../components/Button'
import { List, ListItem } from '../components/List'
import { useDialogState } from '../components/Dialog'
import { ConfirmDialog } from '../components/ConfirmDialog'
import {
  deleteSearch,
  displayStore,
  storeData,
  seedStorage,
} from '../services/storage'
import { TagList } from '../components/Tag'
import { HuntingEditionDialog } from '../components/HuntingEditionDialog'
import { seeds } from '../seeds/data'
import { getSearchSkills } from '../services/utils'

export function Settings({ data, setData }) {
  const { searches = [], status } = data
  const searchIndexRef = useRef(0)
  const search = searches[searchIndexRef.current]

  const confirmDialog = useDialogState()
  const editDialog = useDialogState()

  async function handleConfirmDeletion() {
    const newData = await deleteSearch(data, searchIndexRef.current)
    searchIndexRef.current = 0
    setData(newData)
    confirmDialog.hide()
  }

  async function handleEditList(updatedSearch) {
    const newSearches = [...searches]
    newSearches[searchIndexRef.current] = updatedSearch
    await storeData({ searches: newSearches })
    setData((prev) => ({ ...prev, searches: newSearches }))
    editDialog.hide()
  }

  return (
    <>
      <Title>Hunting lists</Title>

      <Section p={0}>
        <List fontSize="sm">
          {searches.length === 0 ? (
            <ListItem>No searches found.</ListItem>
          ) : (
            searches.map((search, index) => (
              <ListItem key={index} secondary={index % 2} py={2}>
                <x.div>{search.name}</x.div>
                <TagList
                  list={getSearchSkills(search).sort((a, b) =>
                    a.localeCompare(b),
                  )}
                />
                <x.div display="flex" gap={2} justifyContent="flex-end">
                  {searches.length > 1 && (
                    <Button
                      onClick={() => {
                        searchIndexRef.current = index
                        confirmDialog.show()
                      }}
                    >
                      delete
                    </Button>
                  )}

                  <SecondaryButton
                    onClick={() => {
                      searchIndexRef.current = index
                      editDialog.show()
                    }}
                  >
                    edit
                  </SecondaryButton>
                </x.div>
              </ListItem>
            ))
          )}
        </List>
      </Section>

      <x.div display="flex" flexDirection="column" gap={2} mt={2}>
        <SecondaryButton onClick={async () => seedStorage(seeds)}>
          Reset data storage
        </SecondaryButton>

        <SecondaryButton onClick={async () => displayStore()}>
          Log store content
        </SecondaryButton>
      </x.div>

      <ConfirmDialog
        dialog={confirmDialog}
        onConfirm={handleConfirmDeletion}
        confirmLabel="Delete"
      >
        Confirm list <x.span fontWeight="bold">{search.name}</x.span> deletion ?
      </ConfirmDialog>

      <HuntingEditionDialog
        dialog={editDialog}
        search={search}
        status={status}
        onSave={handleEditList}
      />
    </>
  )
}
