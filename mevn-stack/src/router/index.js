import Vue       from 'vue'
import VueRouter from 'vue-router'

import Landing    from '@/components/Landing.vue'
import Home       from '@/components/Home.vue'
import Stack      from '@/components/Stack.vue'
import Search     from '@/components/Search'
import Login      from '@/components/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'landing',   component: Landing },
  { path: '/search',         name: 'search',    component: Search },

  { path: '/stack/all',             name: 'stacks', component: Landing },
  { path: '/stack/:id',             name: 'stack',  component: Landing },
  { path: '/stack/:id/add',         name: 'add',    component: Landing },
  { path: '/stack/:id/edit/:id-c',  name: 'edit',   component: Landing },
  { path: '/stack/:id/learn/:id-c', name: 'learn',  component: Landing },

  { path: '/user/profile',   name: 'profile',   component: Landing },
  { path: '/user/settings',  name: 'landing',   component: Landing },
  { path: '/user/dashboard', name: 'landing',   component: Landing },

  { path: '/auth/login',     name: 'login',     component: Login },
  
  { path: '/home',           name: 'home',      component: Home },
  { path: '/about',          name: 'about',     component: () => import('@/components/About.vue') },
  
  { path: '/stacks',         name: 'stacks',    component: Stack },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
