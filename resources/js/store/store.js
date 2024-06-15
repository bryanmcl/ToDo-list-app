import { defineStore } from "pinia";
import apiClient from "../axios";
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
            return new Promise((resolve, reject) => {
                apiClient
                    .post("/api/auth/login", form)
                    .then((response) => {
                        localStorage.setItem("auth_token", response.data.token);
                        this._user = response.data.user;
                        resolve(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(error);
                    });
            });
        },
        async logout() {
            return new Promise((resolve, reject) => {
                apiClient
                    .post("/api/logout")
                    .then((response) => {
                        this._user = null;
                        this._tasks = [];
                        localStorage.removeItem("auth_token");
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
            return;
        },
        async fetchUser() {
            return new Promise((resolve, reject) => {
                apiClient
                    .get("/api/user")
                    .then((response) => {
                        const { tasks, ...rest } = response.data;
                        this._user = rest;
                        this._tasks = tasks.map((task) => ({
                            ...task,
                            is_completed: !!task.is_completed,
                        }));
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
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
            return new Promise((resolve, reject) => {
                apiClient
                    .delete("/api/tasks/" + id)
                    .then((response) => {
                        this._tasks = this._tasks.filter(
                            (task) => task.id !== id
                        );
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        async updateTask(id, payload) {
            return new Promise((resolve, reject) => {
                apiClient
                    .put("/api/tasks/" + id, payload)
                    .then((response) => {
                        this._tasks = this.tasks.map((task) => {
                            if (task.id === id) {
                                return { ...task, ...response.data.task };
                            }
                            return task;
                        });
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
    getters: {
        isAuthenticated: () => !!localStorage.getItem("auth_token"),
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
