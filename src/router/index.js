import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/index.vue'
import { deepClone } from '../utils/index.js'

const routerHistory = createWebHashHistory()

const routes = [
  {
    path: '/',
    component: Index,
    meta: { name: '首页' }
  },
  {
    path: '/one_person',
    component: () => import('../views/one_person.vue'),
    meta: { name: '一人之下' }
  },
  {
    path: '/game',
    component: () => import('../views/games/treasures.vue'),
    meta: { name: 'Pixi.js' }
  }
]

export const router = createRouter({
  history: routerHistory,
  routes: routes
})

export default router;
export function getRoutes() {
  return deepClone(routes);
}