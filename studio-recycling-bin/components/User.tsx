// User.tsx

import { SanityUser } from '@sanity/client'
import { Text } from '@sanity/ui'

/** ### User Component
 *
 * Displays user information (displayName and optionally email if passed manually)
 */
type UserProps = {
  displayName?: string
  email?: string
}

export default function User({ displayName, email }: UserProps) {
  return (
    <Text muted size={1}>
      Deleted by: {displayName || 'Unknown'}
      {email && ` (${email})`}
    </Text>
  )
}

