import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SigninView from '../views/SigninView.vue'
import SignupView from '../views/SignupView.vue'
import UploadView from '../views/UploadView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
