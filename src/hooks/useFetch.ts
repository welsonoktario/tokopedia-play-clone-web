import { useEffect, useState } from 'react'

import { doFetch } from '@/helpers/fetch'

export const useFetch = <T = unknown>(
  url: `/${string}`,
  options?: RequestInit,
) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!url || url === '/') {
      return
    }

    const initFetch = async () => {
      setLoading(true)
      try {
        const data = await doFetch<T>(url, options)

        setData(data)
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An error occurred, please try again later')
        }
      } finally {
        setLoading(false)
      }
    }

    initFetch()
  }, [url])

  return { loading, data, error }
}
