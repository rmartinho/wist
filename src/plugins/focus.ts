import type { App } from 'vue'

/**
 * Vue plugin to automatically focus a component upon mounting
 * 
 * @example
 * import focus from 'focus'
 * 
 * app.use(focus)
 * 
 * <input v-focus>
 */
export default {
  install(app: App) {
    app.directive('focus', {
      mounted: (el: HTMLInputElement) => {
        if (el.getAttribute('tabindex') == null) {
          el.setAttribute('tabindex', '-1')
        }
        el.focus()
      }
    })
  }
}