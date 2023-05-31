import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/SqlBeauty',
      name: 'SqlBeauty',
      component: () => import('../views/utils/SqlBeauty.vue')
    },
    {
      path: '/Search',
      name: 'Search',
      component: () => import('../views/utils/Search.vue')
    },
    {
      path: '/Calendar',
      name: 'Calendar',
      component: () => import('../views/utils/Calendar.vue')
    },
    {
      path: '/DatePicker',
      name: 'DatePicker',
      component: () => import('../views/utils/DatePicker.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Navigation',
      name: 'Navigation',
      component: () => import('../views/utils/Navigation.vue')
    }
  ]
})

export default router
