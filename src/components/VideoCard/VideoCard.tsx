import { EyeOpenIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, Flex, Text } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'

import { VideoType } from '@/types'

import styles from './VideoCard.module.css'

type VideoCardPropsType = Pick<VideoType, 'title' | 'thumbnailUrl' | 'user'> & {
  id: string
}

export const VideoCard = ({
  id,
  title,
  thumbnailUrl,
  user,
}: VideoCardPropsType) => {
  const navigate = useNavigate()

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      className={styles.cardVideo}
    >
      <img src={thumbnailUrl} className={styles.cardVideoImg} />
      <Box
        onClick={(e) => e.stopPropagation()}
        position="absolute"
        bottom="0"
        left="0"
        top="0"
        right="0"
        className={styles.cardVideoOverlay}
      ></Box>
      <Flex
        onClick={(e) => e.stopPropagation()}
        position="absolute"
        bottom="0"
        left="0"
        top="0"
        right="0"
        justify="center"
        align="center"
        className={styles.cardVideoOverlayContent}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation()
            navigate(`videos/${id}`)
          }}
          m="auto"
          variant="surface"
        >
          <EyeOpenIcon />
          Watch video
        </Button>
      </Flex>

      <Flex
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        m="4"
        gap="3"
        direction="column"
        grow="1"
      >
        <Text weight="bold" size="2" className={styles.cardVideoTitle}>
          {title}
        </Text>
        <Flex align="center" gap="2">
          <Avatar
            src={user.avatarUrl}
            radius="full"
            fallback={`https://ui-avatars.com/api/?name=${user.username}`}
            size="2"
          ></Avatar>
          <Text style={{ color: 'hsl(300, 26.0%, 99.0%)' }}>
            {user.username}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
