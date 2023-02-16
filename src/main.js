import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";


import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/poppins/index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

createApp(App).use(router).mount('#app')
