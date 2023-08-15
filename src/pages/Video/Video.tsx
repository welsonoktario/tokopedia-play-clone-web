import { EnterIcon, PaperPlaneIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CommentList } from '@/components/CommentList/CommentList'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { withTransition } from '@/components/withTransition'
import { doFetch } from '@/helpers/fetch'
import { useAuth, useFetch } from '@/hooks'
import { CommentType, VideoType } from '@/types'

import styles from './Video.module.css'

export const VideoPage = withTransition(() => {
  const { videoId } = useParams()
  const { user, setIsDialogOpen } = useAuth()
  const { loading, data: video } = useFetch<VideoType>(`/videos/${videoId}`)

  const [comments, setComments] = useState<CommentType[]>([])
  const [comment, setComment] = useState('')
  const [sendLoading, setSendLoading] = useState(false)

  useEffect(() => {
    setSendLoading(true)
    if (video) {
      setComments(video.comments)
    }
    setSendLoading(false)
  }, [video])

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSendLoading(true)

    try {
      const data = await doFetch<CommentType>(`/videos/${videoId}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          username: user?.username,
          comment,
        }),
      })

      if (data) {
        setComments([...comments, data])
      }
      setComment('')
    } catch (err: any) {
    } finally {
      setSendLoading(false)
    }
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {video && (
        <Grid columns="6" gap="6">
          <Box className={styles.videoWrapper}>
            <Flex direction="column">
              <Heading mb="4">{video.title}</Heading>
              <iframe
                className={styles.videoPlayer}
                src="https://www.youtube.com/embed/INE2Ys7-zZ0?&autoplay=1"
                allowFullScreen
              />
              <Text size="3" weight="bold" mb="2">
                Products in this video:
              </Text>
              <Flex className={styles.productsList} direction="row" gap="4">
                {video.products.length ? (
                  video.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <Text>No products available</Text>
                )}
              </Flex>
            </Flex>
          </Box>
          <Flex direction="column" className={styles.commentWrapper}>
            <Separator size="4" />
            <CommentList comments={comments} />
            {user ? (
              <form onSubmit={handleComment}>
                <Box m="4">
                  <TextField.Root>
                    <TextField.Input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      name="username"
                      placeholder="Enter a comment"
                      maxLength={200}
                      size="3"
                      required
                    />
                    <TextField.Slot>
                      <Button
                        type="submit"
                        variant="ghost"
                        size="3"
                        mr="1"
                        disabled={sendLoading}
                      >
                        Send
                        <PaperPlaneIcon />
                      </Button>
                    </TextField.Slot>
                  </TextField.Root>
                </Box>
              </form>
            ) : (
              <Button
                onClick={() => setIsDialogOpen(true)}
                variant="soft"
                size="3"
                my="auto"
              >
                <EnterIcon />
                Sign-in to add a Comment
              </Button>
            )}
          </Flex>
        </Grid>
      )}
    </>
  )
})
