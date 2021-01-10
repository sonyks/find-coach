import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from '../pages/coaches/CoachesList.vue';
import NotFound from '../pages/NotFound.vue';
import store from '../store/index.js';

const CoachDetail = () => import('../pages/coaches/CoachDetail.vue');
const CoachRegistration = () => import('../pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('../pages/requests/ContactCoach.vue');
const RequestReceived = () => import('../pages/requests/RequestReceived.vue');
const UserAuth = () => import('../pages/auth/UserAuth.vue');

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
    component: CoachRegistration,
    meta: { requiresAuth: true }
  },
  {
    path: '/requests',
    component: RequestReceived,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    component: UserAuth,
    meta: { requiresUnauth: true }
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

router.beforeEach(function(to, _, next) {
  if (to.meta.requresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requresUnauth) {
    next('/coaches');
  } else {
    next();
  }
});

export default router
