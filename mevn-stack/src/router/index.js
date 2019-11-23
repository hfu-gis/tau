import Vue       from 'vue'
import VueRouter from 'vue-router'

import Landing    from '@/components/Landing.vue'
import Home       from '@/components/Home.vue'
//import Stacks      from '@/components/Stacks.vue'
import Stack         from '@/components/Stack.vue'
import Search        from '@/components/Search'
import Login         from '@/components/Login.vue'
import Stackoverview from '@/components/Stackoverview.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'home', component: Landing },
  { path: '/search', name:'search', component: Search },

  { path: '/stacks/',                name:'stacks',   component: Home, },
  { path: '/stacks/:id',             name:'stack',    component: Stack },
  { path: '/stacks/add',             name:'s-create', component: Home },
  { path: '/stacks/:id/add/card',    name:'c-create', component: Home },
  { path: '/stacks/:id/edit/:id-c',  name:'s-edit',   component: Home },
  { path: '/stacks/:id/learn/:id-c', name:'s-learn',  component: Home },

  { path: '/stackoverview', name:'sadasd',  component: Stackoverview },
  

  { path: '/user/profile',   component: Home },
  { path: '/user/settings',  component: Home },
  { path: '/user/dashboard', component: Home },

  { path: '/auth/login', component: Login },
  
  { path: '/home', name:'home', component: Home },
  { path: '/about', name: 'about',     component: () => import('@/components/About.vue') },
  
  { path: '/stacks', component: Stack },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
