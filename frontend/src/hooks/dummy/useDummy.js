import { useMutation, useQuery } from 'react-query'
import { get, post, request } from '../../services/request'
import { XHR_RETRY_DELAY } from '../../configs/env'

const QUERY_KEY = 'dummy'

const getDummy = async () => {
  try {
    return get('https://pokeapi.co/api/v2/pokemon?limit=20')
  } catch (err) {
    // if (!QueryClient.getQueryState([QUERY_KEY,{data:'dummy'}])?.data)
    //   showApiError(err)
    console.log(err)
  }
}

export function useDummyMutation(data) {
  return useMutation(
    () => {
      return getDummy()
    },
    { onMutate: () => {}, onSettled: () => {} },
  )
}

export function useDummyQuery(data) {
  return useQuery([QUERY_KEY, { data: 'dummy' }], getDummy, {
    enabled: true,
    retry: true,
    retryDelay: XHR_RETRY_DELAY,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    staleTime: 120000,
  })
}
