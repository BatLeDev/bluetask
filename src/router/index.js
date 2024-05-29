import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/index.vue'
import About from '@/pages/about.vue'
import Dashboard from '@/pages/dashboard.vue'
import Login from '@/pages/authentication/login.vue'
import Register from '@/pages/authentication/register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/authentication/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/authentication/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
