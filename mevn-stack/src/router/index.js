import Vue       from 'vue'
import VueRouter from 'vue-router'

import Home       from '@/components/Home.vue'
import Stack      from '@/components/Stack.vue'
import Search     from '@/components/Search'
import Login      from '@/components/Login.vue'
import SignUp     from "@/components/SignUp.vue"
import Profile    from "@/components/Profile.vue"
import LearnCards from "@/components/LearnCard.vue"
import CreateCard from "@/components/CreateCard.vue"

import firebase from 'firebase'

Vue.use(VueRouter)

let routes = [
  { path: '/', redirect: 'home' },
  { 
    path: '/home', 
    name: 'home', 
    component: Home,
    meta: {
      requiresAuth: true
    } 
  },
  { 
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      requiresAuth: true
    }
  },
  
  { path: '/stacks/:id',                    name:'stack',    component: Stack },
  { path: '/stacks/add',                    name:'s-create', component: Home },
  { path: '/stacks/:id/add/card',           name:'c-create', component: CreateCard },
  { path: '/stacks/:id/edit/:id-c',         name:'s-edit',   component: Home },
  { path: '/stacks/:id/learn/:currentCard', name:'s-learn',  component: LearnCards },

  { path: '/auth/login',  component: Login },
  { path: '/auth/signup', component: SignUp},
  
  { path: '/about', name: 'about', component: () => import('@/components/About.vue') },
 
]

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Check for Routes with requiresAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/auth/login',
        // query: { redirect: to.fullPath }
      });
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
      if (firebase.auth().currentUser) {
        next({
          path: '/',
          // query: { redirect: to.fullPath }
        });
      } else {
        next()
    }
  } else {
    next()
  }
})

export default router
