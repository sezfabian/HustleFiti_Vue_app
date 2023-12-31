import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SigninView from '../views/SigninView.vue'
import SignupView from '../views/SignupView.vue'
import UploadView from '../views/UploadView.vue'
import ServicesView from '../views/ServicesView.vue'
import ProfileView from '../views/ProfileView.vue'
import NewServiceView from '../views/NewServiceView.vue'
import EditServiceView from '../views/EditServiceView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import BookingView from '../views/BookingView.vue'
import VerificationView from '../views/VerificationView.vue'

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
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/new-service',
    name: 'new-service',
    component: NewServiceView
  },
  {
    path: '/edit-service/:id',
    name: 'edit-service',
    component: EditServiceView,
    props: true
  },
  {
   path: '/edit-profile',
   name: 'edit-profile',
   component: EditProfileView 
  },
  {
    path: '/booking/:serviceId',
    name: 'booking',
    component: BookingView,
    props: true
  },
  {
    path: '/verification',
    name: 'verification',
    component: VerificationView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
