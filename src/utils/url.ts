// Vue composable that provides access to the current page's URL fragment
//
// Usage:
//  import { useUrlFragment } from 'url'
//
//  const urlFragment = useUrlFragment()

import { computed, type Ref } from 'vue'
import { useEventTrigger } from '@/utils/event'

export function useUrlFragment(): Ref<string> {
  useEventTrigger(window, 'hashchange')
  return computed({
    get() {
      return window.location.hash?.substring(1)
    },
    set(newFragment: string) {
      window.location.hash = `#${newFragment}`
    }
  })
}
