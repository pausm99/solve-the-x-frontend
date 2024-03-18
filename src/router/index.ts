import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;