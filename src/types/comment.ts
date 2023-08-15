import { UserType } from './user'

export type CommentType = {
  _id: string
  user: UserType
  comment: string
  timestamp: string
}
