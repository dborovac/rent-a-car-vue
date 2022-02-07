import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Single from '@/views/Single.vue';
import Reservations from '@/views/Reservations.vue';
import Settings from '@/views/Settings.vue';
import Reviews from '@/views/Reviews.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/book/:id',
        name: 'Single',
        component: Single
    },
    {
        path: '/reservations',
        name: 'Reservations',
        component: Reservations
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/reviews',
        name: 'Reviews',
        component: Reviews
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
