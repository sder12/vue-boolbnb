import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';
import SearchPage from './pages/SearchPage.vue';
import ApartmentPage from "./pages/ApartmentPage.vue";
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/search',
            name: 'search',
            component: SearchPage
        },
        {
            path: '/:slug',
            name: 'show',
            component: ApartmentPage,
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