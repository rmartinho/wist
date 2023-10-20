// Vue composable that provides access to the current page's URL fragment
//
// Usage:
//  import { useUrlFragment } from 'url'
//
//  const { urlFragment } = useUrlFragment()

import { computed, ref, type Ref } from 'vue'
import { useEventListener } from '@/utils/event'

function hash() {
  return window.location.hash?.substring(1)
}

export function useUrlFragment(): { urlFragment: Ref<string> } {
  const fragment = ref(hash())
  useEventListener(window, 'hashchange', () => fragment.value = hash())
  return {
    urlFragment: computed({
      get() {
        return fragment.value
      },
      set(newFragment: string) {
        window.location.hash = `#${newFragment}`
      }
    })
  }
}
