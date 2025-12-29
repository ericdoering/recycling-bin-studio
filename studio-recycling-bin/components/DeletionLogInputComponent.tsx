import { Stack } from '@sanity/ui'
import groq from 'groq'
import { useEffect } from 'react'
import { ArrayOfObjectsInputProps, useClient, useFormValue } from 'sanity'
import { LogItem } from "../types"

export function DeletionLogInputComponent(props: ArrayOfObjectsInputProps) {
  
  const client = useClient({ apiVersion: '2025-12-27' }).withConfig({
    perspective: 'drafts',
  })

  const documentID = useFormValue(['_id']) as string

  const logItems = (props.value as LogItem[] | undefined) || []
  
  const idsToCheck = [...new Set(logItems.map((item) => item.docId))]

  useEffect(() => {
    if (!idsToCheck.length || !documentID) return

    const query = groq`*[_id in $docIds]._id`
    const params = { docIds: idsToCheck }

    client
      .fetch(query, params)
      .then((restoredIds: string[]) => {
        if (restoredIds.length > 0) {
          
          console.log(`Cleaning up restored docs: ${restoredIds.join(', ')}`)

          const itemsToUnset = restoredIds.map(
            (id) => `deletedDocLogs[docId == "${id}"]`
          )

          client
            .patch(documentID)
            .unset(itemsToUnset)
            .commit()
            .catch((err) => console.error('Patch failed:', err))
        }
      })
      .catch((err) => {
        console.error('Fetch failed:', err.message)
      })
      
  }, [JSON.stringify(idsToCheck), documentID, client])

  return (
    <Stack space={4}>
      {props.renderDefault({ ...props, arrayFunctions: () => null })}
    </Stack>
  )
}