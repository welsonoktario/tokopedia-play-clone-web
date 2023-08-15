import { ScrollArea, Text } from '@radix-ui/themes'

import { CommentType } from '@/types'

import { CommentItem } from '../CommentItem'
import styles from './CommentList.module.css'

type CommentListPropsType = {
  comments: CommentType[]
}

export const CommentList = ({ comments }: CommentListPropsType) => {
  return (
    <ScrollArea
      className={styles.commentListWrapper}
      type="always"
      scrollbars="vertical"
    >
      {comments.length ? (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      ) : (
        <Text as="p" ml="4" mt="4">
          No comment yet
        </Text>
      )}
    </ScrollArea>
  )
}
