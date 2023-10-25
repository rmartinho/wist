import '@/assets/styles/main.css'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import focus from '@/plugins/focus'
import App from '@/App.vue'

createApp(App)
  .use(createHead())
  .use(focus)
  .mount('#app')
