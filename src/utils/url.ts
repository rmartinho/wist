import { computed, type Ref } from 'vue'
import { useEventTrigger } from '@/utils/event'

/**
 * Vue composable that provides access to the URL fragment
 * 
 * @returns A reactive object representing the current location's URL fragment
 * 
 * @example
 * const urlFragment = useUrlFragment()
 * urlFragment.value = 'foo'
 * console.log(window.location.hash) // '#foo'
 * window.location.hash = '#bar'
 * console.log(urlFragment.value) // 'bar'
 */
export function useUrlFragment(): Ref<string> {
  useEventTrigger(window, 'hashchange')
  return computed({
    get() {
      return window.location.hash?.substring(1)
    },
    set(newFragment) {
      window.location.hash = `#${newFragment}`
    }
  })
}
