import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';
import SearchPage from './pages/SearchPage.vue';
import ApartmentPage from "./pages/ApartmentPage.vue";
import SentMessagePage from "./pages/SentMessagePage.vue";
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
            path: '/search/location=:address',
            name: 'search',
            component: SearchPage
        },
        {
            path: '/:slug',
            name: 'show',
            component: ApartmentPage,
        },
        {
            path: '/sent-message',
            name: 'sent-message',
            component: SentMessagePage,
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