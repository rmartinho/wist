import { computed, type Ref } from 'vue'
import { useEventTrigger } from '@/utils/event'

/**
 * A Vue composable that provides reactive access to media queries 
 * 
 * @param query The media query to track
 * @returns A reactive {@link MediaQueryList} object that tracks the media query
 * 
 * @example
 * const query = useMediaQuery(query)
 * watchEffect(() => console.log(query.value.matches))
 */
export function useMediaQuery(query: string): Ref<MediaQueryList> {
  const queryObj = window.matchMedia(query)
  const trigger = useEventTrigger(queryObj, 'change')
  return computed(() => {
    return trigger.watch(queryObj)
  })
}