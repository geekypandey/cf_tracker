import { createApp } from 'vue'
import { createPinia } from 'pinia';

// imports for vue-virtual-scroller
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import './style.css'
import router from '@/router'
import App from './App.vue'

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(VueVirtualScroller)

app.mount('#app');
