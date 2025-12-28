// in DeletedDocIdInputComponent.tsx
import { Card, Flex, Text } from '@sanity/ui'
import { ComponentType } from 'react'
import { StringInputProps } from 'sanity'


export const DeletedDocIdInputComponent: ComponentType<StringInputProps> = (
  props,
) => {
  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      gap={2}
      paddingLeft={2}
      paddingY={2}
    >
      <Card>
        <Text>{props.value}</Text>
      </Card>
    </Flex>
  )
}

