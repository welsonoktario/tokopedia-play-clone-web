import { CommentType } from './comment'
import { ProductType } from './product'
import { UserType } from './user'

export type VideoType = {
  _id: string
  title: string
  thumbnailUrl: string
  user: UserType
  products: Array<ProductType>
  comments: Array<CommentType>
}
