// Vue composables for HTML events handlers
//
// Usage:
//  import { useEventListener, useEventTrigger } from 'event'
//
//  useEventListener(el, 'click', onClick) // is automatically removed upon unmounting
//  const { trigger } = useEventTrigger(el, 'click') // returns a trigger object that triggers when the event fires

import { onMounted, onUnmounted } from 'vue'
import { trigger, type Trigger } from '@/utils/trigger';

export function useEventListener(
  target: EventTarget,
  event: string, listener: EventListenerOrEventListenerObject | null,
  options?: AddEventListenerOptions | boolean
): void {
  onMounted(() => target.addEventListener(event, listener, options))
  onUnmounted(() => target.removeEventListener(event, listener, options))
}

export function useEventTrigger(
  target: EventTarget,
  event: string,
  options?: AddEventListenerOptions | boolean
): { trigger: Trigger } {
  const t = trigger()
  useEventListener(target, event, t.trigger, options)
  return { trigger: t }
}
