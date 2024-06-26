import App from './App.vue'
import { registerPlugins } from '@/plugins'
import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
}

const firebaseApp = initializeApp(firebaseConfig)
const app = createApp(App)

registerPlugins(app)

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth()
  ]
})

app.mount('#app')
