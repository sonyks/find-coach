import { createRouter, createWebHistory } from 'vue-router'
import CoachDetail from '../pages/coaches/CoachDetail.vue';
import CoachesList from '../pages/coaches/CoachesList.vue';
import CoachRegistration from '../pages/coaches/CoachRegistration.vue';
import ContactCoach from '../pages/requests/ContactCoach.vue';
import RequestReceived from '../pages/requests/RequestReceived.vue';
import UserAuth from '../pages/auth/UserAuth.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/coaches'
  },
  {
    path: '/coaches',
    component: CoachesList
  },
  {
    path: '/coaches/:id',
    component: CoachDetail,
    props: true,
    children: [
      { path: 'contact', component: ContactCoach } // /coaches/c1/contact
    ]
  },
  {
    path: '/register',
    component: CoachRegistration
  },
  {
    path: '/requests',
    component: RequestReceived
  },
  {
    path: '/auth',
    component: UserAuth
  },
  {
    path: '/:notFound(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
