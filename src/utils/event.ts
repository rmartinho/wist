import { onMounted, onUnmounted } from 'vue'
import { trigger, type Trigger } from '@/utils/trigger'

/**
 * A Vue composable for attaching/detaching event listeners when the DOM becomes available/unavailable
 * 
 * @param target The object to attach the listener to
 * @param event The name of the event to listen to
 * @param options Event listener options, which will be passed unchanged to {@link EventTarget.addEventListener addEventListener}
 * 
 * @example
 * useEventListener(button1, 'click', onClick) // is automatically removed upon unmounting
 * useEventListener(button2, 'click', onClick, { once: true })
*/
export function useEventListener(
  target: EventTarget,
  event: string, listener: EventListenerOrEventListenerObject | null,
  options?: AddEventListenerOptions | boolean
): void {
  onMounted(() => target.addEventListener(event, listener, options))
  onUnmounted(() => target.removeEventListener(event, listener, options))
}

/**
 * A Vue composable to make effects or computed refs depend on specific events 
 * 
 * @param target The object to listen for events
 * @param event The name of the event to listen to
 * @param options Event listener options, which will be passed unchanged to {@link EventTarget.addEventListener addEventListener}
 * @returns A {@link Trigger} object that triggers whenever the event fires
 * 
 * @example
 * const trigger = useEventTrigger(button, 'click')
 * // log clicks
 * watchEffect(() => console.log(trigger.watch('clicked')))
 */
export function useEventTrigger(
  target: EventTarget,
  event: string,
  options?: AddEventListenerOptions | boolean
): Trigger {
  const t = trigger()
  useEventListener(target, event, t.trigger, options)
  return t
}
