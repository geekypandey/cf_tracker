import { createWebHistory, createRouter } from 'vue-router'

import ContestView from '@/views/ContestView.vue'
import ProblemsetView from '@/views/ProblemsetView.vue'

const routes = [
    { path: '/', component: ContestView },
    { path: '/contests', component: ContestView },
    { path: '/problemset', component: ProblemsetView },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
