import { Grid, Text } from '@radix-ui/themes'

import { VideoCard } from '@/components/VideoCard/VideoCard'
import { withTransition } from '@/components/withTransition'
import { useFetch } from '@/hooks'
import { VideoType } from '@/types'

export const HomePage = withTransition(() => {
  const { loading, data, error } = useFetch<VideoType[]>('/videos')

  return (
    <>
      {loading && <p>Loading...</p>}
      {data && data.length ? (
        <Grid columns="3" gap="4" width="auto">
          {data.map((video) => (
            <VideoCard
              key={video._id}
              id={video._id}
              user={video.user}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
            />
          ))}
        </Grid>
      ) : (
        <Text>No videos available right now :)</Text>
      )}
      {error && <Text>{error}</Text>}
    </>
  )
})
