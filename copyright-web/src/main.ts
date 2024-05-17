import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// for (const [key, component] of Object.entries(ElementUI)) {
//     app.component(key, component);
// }

app.mount('#app')
