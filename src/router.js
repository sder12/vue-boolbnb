import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },

        // LAST: 404 not found
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFoundPage,
        }
    ],
});

export { router };