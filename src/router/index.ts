import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import StatsView from "../views/StatsView.vue";
import AuthService from '../services/authService';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { requiresAuth: true },
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: StatsView,
        meta: { requiresAuth: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    {
        path: '/login',
        name: 'Log In',
        component: RegisterView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth && !AuthService.isLoggedIn()) {
      next('/login');
    } else {
      next();
    }
  });

export default router;