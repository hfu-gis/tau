import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from '../components/Landing.vue'
import Home from '../views/Home.vue'
import Stack from '../views/Stack.vue'
import Search from '../views/Search'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/stacks',
    name: 'stacks',
    component: Stack
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
