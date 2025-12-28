// DeletionLogItemComponent.tsx

import { SanityUser } from '@sanity/client'
import { RestoreIcon } from '@sanity/icons'
import { Card, Flex, Stack, Text } from '@sanity/ui'
import { ComponentType, useEffect, useState } from 'react'
import { IntentButton, ObjectItemProps, useClient } from 'sanity'
import { LogItem } from "../types"
import User from "./User"

const apiVersion = '2025-12-27'

/** ### Array Item Component for each log entry
 *
 * with Intent Button to open the document and restore it
 */
export const DeletionLogItemComponent: ComponentType<ObjectItemProps<LogItem>> = async (props) => {
  // * Get the value from the props
  const value = props.value
  // * Set up user client to get the user name of the user who deleted the document
  const client = useClient({ apiVersion }).withConfig({ withCredentials: true })
  const [user, setUser] = useState<SanityUser | undefined>()

  useEffect(() => {
    // * Get the user name of the user who deleted the document
    value.deletedBy &&
      client.users
        .getById(value.deletedBy)
        .then((user) => {
          setUser(user)
        })
        .catch((error) => {
          console.error('Error fetching user:', error)
        })
  }, [])

  // * Format the date to be nice and universal
  const date = new Date(value.deletedAt)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const formattedDate = `${date.getDate()}.${months[date.getMonth()]} ${date.getFullYear()}`

  return (
    <Card borderTop={props.index > 0 ? true : false}>
      <Flex justify={'space-between'} align={'center'} gap={2} paddingX={4} paddingY={4}>
        <Stack space={3}>
          <Text weight="semibold">{value.documentTitle}</Text>

          <Text muted size={1}>
            Type: {value.type}
          </Text>

          <Text muted size={1}>
            Deleted: {formattedDate}
          </Text>
          
          {user && <User {...user} />}
          
          <Text muted size={0}>
            ID: {value.docId}, Revision: {value._key as string}
          </Text>
        </Stack>
        {value.docId && (
          <IntentButton
            icon={RestoreIcon}
            tone={'positive'}
            mode="ghost"
            intent="edit"
            params={{
              type: value.type,
              id: value.docId,
              revision: value._key,
            }}
            text="Open to restore"
            tooltipProps={{
              placement: 'top',
              content: 'You can restore this document after opening it',
            }}
          />
        )}
      </Flex>
    </Card>
  )
}