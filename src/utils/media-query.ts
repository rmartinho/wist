// Vue composable that provides reactive access to media queries
// 
// Usage:
//  import { useMediaQuery } from 'media-query'
//
//  const query = useMediaQuery(query)
//  watchEffect(() => console.log(query.value.matches))

import { computed, type Ref } from 'vue'
import { useEventTrigger } from '@/utils/event'

export function useMediaQuery(queryString: string): Ref<MediaQueryList> {
  const query = window.matchMedia(queryString)
  const trigger = useEventTrigger(query, 'change')
  return computed(() => {
    trigger.use()
    return query
  })
}