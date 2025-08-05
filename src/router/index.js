import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { useAuth } from '../composables/useAuth'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookVue.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'

const routes = [
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // This route requires authentication
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/WeatherCheck',
    name: 'GetWeather',
    component: WeatherView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const { authenticated, initAuth } = useAuth()
  
  // Initialize auth state from localStorage
  initAuth()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authenticated.value) {
    // Redirect to login with the intended destination
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name === 'Login' && authenticated.value) {
    // If user is already logged in and tries to access login, redirect to home
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router