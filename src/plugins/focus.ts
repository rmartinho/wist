// Vue plugin to automatically focus a component upon mounting
//
// Usage:
//  import focus from 'focus'
//
//  app.use(focus)

import type { App } from 'vue';

export default {
  install(app: App) {
    app.directive('focus', {
      mounted: (el: HTMLInputElement) => {
        if (el.getAttribute('tabindex') == null) {
          el.setAttribute('tabindex', '-1');
        }
        el.focus()
      }
    });
  }
}