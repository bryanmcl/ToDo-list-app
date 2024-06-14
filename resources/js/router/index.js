import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import HomePage from "../pages/HomePage.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { useStore } from "../store/store";

const routes = [
    { name: "Home", path: "/", component: HomePage },
    {
        name: "Dashboard",
        path: "/dashboard",
        component: Dashboard,
    },
    { name: "Login", path: "/login", component: Login },
    { name: "Register", path: "/register", component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
