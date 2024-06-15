import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../pages/TaskList.vue";
import HomePage from "../pages/HomePage.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { useStore } from "../store/store";

const routes = [
    { name: "Home", path: "/", component: HomePage },
    { name: "TaskList", path: "/task-list", component: TaskList },
    { name: "Login", path: "/login", component: Login },
    { name: "Register", path: "/register", component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
