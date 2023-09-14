import './assets/main.css'
// import './assets/github.css'
// import './assets/inside.css'
// import '@/assets/drakeMaterial.css'
// import './assets/newSprint.css'
import './assets/night.css'
// import './assets/orangeHeart.css'
// import './assets/simpleWhite.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
