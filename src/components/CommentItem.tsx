import { Avatar, Flex, Separator, Text } from '@radix-ui/themes'

import { CommentType } from '@/types'

type CommentItemPropsType = {
  comment: CommentType
}

export const CommentItem = ({ comment }: CommentItemPropsType) => {
  const { comment: commentText, user, timestamp } = comment

  const commentDateTime = () =>
    new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
      .format(new Date(timestamp))
      .replaceAll('/', '-')
      .replace('.', ':')

  return (
    <>
      <Separator size="4" />
      <Flex direction="column" gap="2" px="4">
        <Flex justify="between" align="center" grow="1">
          <Flex align="center" gap="2">
            <Avatar
              src={user.avatarUrl}
              radius="full"
              fallback={`https://ui-avatars.com/api/?name=${user.username}`}
              size="1"
            ></Avatar>
            <Text color="green">{user.username}</Text>
          </Flex>
          <Text size="1" color="gray">
            {commentDateTime()}
          </Text>
        </Flex>
        <Text>{commentText}</Text>
      </Flex>
    </>
  )
}
