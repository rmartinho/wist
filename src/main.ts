import '@/assets/main.css'

import { createApp } from 'vue'
import focus from '@/plugins/focus'
import App from '@/App.vue'

createApp(App)
  .use(focus)
  .mount('#app')
