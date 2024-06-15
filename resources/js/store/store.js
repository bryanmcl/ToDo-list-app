import { defineStore } from "pinia";
import apiClient from "../axios";
import axios from "axios";
import { formatDate } from "../utils/date";

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
                .post("/api/auth/login", form)
                .then((response) => {
                    localStorage.setItem("auth_token", response.data.token);
                    this._user = response.data.user;
                })
                .catch((error) => {
                    console.error(error);
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
                    this._tasks = tasks.map((task) => ({
                        ...task,
                        is_completed: !!task.is_completed,
                    }));
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async addTask(payload) {
            return new Promise((resolve, reject) => {
                apiClient
                    .post("/api/task/create", payload)
                    .then((response) => {
                        this._tasks.push(response.data.task);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
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
        async updateTask(id, payload) {
            apiClient
                .put("/api/tasks/" + id, payload)
                .then((response) => {
                    this._tasks = this.tasks.map((task) => {
                        if (task.id === id) {
                            return { ...task, ...response.data.task };
                        }
                        return task;
                    });
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
        tasksDueToday: (state) => {
            return state._tasks.filter((task) => {
                const isToday =
                    formatDate(task.due_date) ===
                    formatDate(new Date().toString());
                const isNotCompleted = !task.is_completed;

                return isToday && isNotCompleted;
            });
        },
        completedTasks: (state) =>
            state._tasks.filter((task) => task.is_completed),
    },
});
