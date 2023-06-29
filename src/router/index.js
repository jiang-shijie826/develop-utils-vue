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
      component: () => import('../views/Home.vue'),
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
    },
    {
      path: '/ChatGPT',
      name: 'ChatGPT',
      component: () => import('../views/utils/ChatGPT.vue')
    },
    {
      path: '/ToDoList',
      name: 'ToDoList',
      component: () => import('../views/utils/ToDoList.vue')
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: () => import('../components/layout/Admin.vue')
    },
    {
      path: '/User',
      name: 'User',
      component: () => import('../views/admin/User.vue')
    }
    ,
    {
      path: '/Carousel',
      name: 'Carousel',
      component: () => import('../views/admin/Carousel.vue')
    }
    ,
    {
      path: '/Compass',
      name: 'Compass',
      component: () => import('../views/admin/Compass.vue')
    }
    ,
    {
      path: '/SearchIco',
      name: 'SearchIco',
      component: () => import('../views/admin/SearchIco.vue')
    }
    ,
    {
      path: '/Compass',
      name: 'Compass',
      component: () => import('../views/admin/Compass.vue')
    }
    ,
    {
      path: '/Countdown',
      name: 'Countdown',
      component: () => import('../views/admin/Countdown.vue')
    }
    ,
    {
      path: '/Notepad',
      name: 'Notepad',
      component: () => import('../views/admin/Notepad.vue')
    }
    ,
    {
      path: '/PhotoWall',
      name: 'PhotoWall',
      component: () => import('../views/utils/PhotoWall.vue')
    }
  ]
})

export default router
