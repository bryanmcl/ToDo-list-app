import { defineStore } from "pinia";
import apiClient from "../axios";
import axios from "axios";

export const useStore = defineStore("store", {
    state: () => {
        return {
            _user: null,
            _tasks: [],
        };
    },
    actions: {
        async login(form) {
            return axios
                .post("/auth/login", form)
                .then((response) => {
                    localStorage.setItem("auth_token", response.data.token);
                    this._user = response.data.user;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async logout() {
            return apiClient
                .post("/api/logout")
                .then(() => {
                    this._user = null;
                    this._tasks = [];
                    localStorage.removeItem("auth_token");
                })
                .catch((error) => {
                    console.error("Failed to logout:", error);
                });
        },
        async fetchUser() {
            return apiClient
                .get("/api/user")
                .then((response) => {
                    const { tasks, ...rest } = response.data;
                    this._user = rest;
                    this._tasks = tasks;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        addTask(payload) {
            apiClient.post("/api/task/create", payload).then((response) => {
                this._tasks.push(response.data.task);
            });
        },
        deleteTask(id) {
            apiClient
                .delete("/api/tasks/" + id)
                .then(() => {
                    this._tasks = this._tasks.filter((task) => task.id !== id);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    getters: {
        isAuthenticated: (state) => !!state._user,
        user: (state) => state._user,
        tasks: (state) => state._tasks,
    },
});
