type JsonResponseType<T = unknown> = {
  status: string
  data?: T
  msg?: string
}

const BASE_API_URL = import.meta.env.VITE_API_URL

export const doFetch = async <T = unknown>(
  url: `/${string}`,
  options?: RequestInit,
) => {
  const res = await fetch(BASE_API_URL + url, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const json = (await res.json()) as JsonResponseType<T>

  if (json.status === 'FAIL') {
    throw new Error(json.msg)
  }

  return json.data
}
