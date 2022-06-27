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
import { myData } from '../seeds/myData'

export function Settings({ data, setData }) {
  const { searches = [], status } = data
  const searchIdRef = useRef(searches[0]?.id ?? null)
  const confirmDialog = useDialogState()
  const editDialog = useDialogState()

  function openConfirmDialog(searchId) {
    searchIdRef.current = searchId
    confirmDialog.show()
  }

  async function handleConfirmDeletion() {
    const newData = await deleteSearch(data, searchIdRef.current)
    setData(newData)
    confirmDialog.hide()
  }

  async function openEditDialog(searchId) {
    searchIdRef.current = searchId
    editDialog.show()
  }

  async function handleEditList(updatedSearch) {
    const newSearches = [...searches]
    newSearches[searchIdRef.current] = updatedSearch
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
                  list={search.skills
                    .split(',')
                    .map((skill) => skill.trim())
                    .filter((e) => e)
                    .sort((a, b) => a.localeCompare(b))}
                />
                <x.div display="flex" gap={2} justifyContent="flex-end">
                  {searches.length > 1 && (
                    <Button onClick={() => openConfirmDialog(search.id)}>
                      delete
                    </Button>
                  )}

                  <SecondaryButton onClick={() => openEditDialog(search.id)}>
                    edit
                  </SecondaryButton>
                </x.div>
              </ListItem>
            ))
          )}
        </List>
      </Section>

      <x.div display="flex" flexDirection="column" gap={2} mt={2}>
        <SecondaryButton onClick={async () => seedStorage(myData)}>
          Seed personal data
        </SecondaryButton>

        <SecondaryButton onClick={async () => displayStore()}>
          Log store content
        </SecondaryButton>
      </x.div>

      <ConfirmDialog
        dialog={confirmDialog}
        onConfirm={() => handleConfirmDeletion(searchIdRef.current)}
        confirmLabel="Delete"
      >
        Confirm list{' '}
        <x.span fontWeight="bold">{searches[searchIdRef.current]?.name}</x.span>{' '}
        deletion ?
      </ConfirmDialog>

      <HuntingEditionDialog
        dialog={editDialog}
        search={searches[searchIdRef.current]}
        status={status}
        onSave={handleEditList}
      />
    </>
  )
}
