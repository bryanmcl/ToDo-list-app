<template>
    <div class="dashboard-wrapper">
        <Sidebar />
        <div class="tasks-wrapper">
            <h1>{{ pageTitle }}</h1>
            <button @click="isModalVisible = true">+ Create New Task</button>
            <SearchBar
                v-model:searchQuery="searchQuery"
                v-model:sortOption="sortOption"
            />
            <div class="task-list-container">
                <Task
                    v-for="task in filteredAndSortedTasks"
                    :key="task.id"
                    :id="task.id"
                    :title="task.title"
                    :dueDate="task.due_date"
                    :priority="task.priority"
                    :isCompleted="task.is_completed"
                />
            </div>
        </div>
    </div>

    <CreateModal :isVisible="isModalVisible" @close="isModalVisible = false" />
</template>

<script setup>
import CreateModal from "../components/CreateModal.vue";
import Sidebar from "../components/Sidebar.vue";
import Task from "../components/Task.vue";
import SearchBar from "../components/SearchBar.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "../store/store";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const store = useStore();
const router = useRouter();
const route = useRoute();

const PRIORITY_MAP = {
    high: 1,
    medium: 2,
    low: 3,
};

const isModalVisible = ref(false);
const taskList = ref([]);
const searchQuery = ref("");
const sortOption = ref("dueDate");

const pageTitle = computed(() => {
    switch (route.query.filter) {
        case "today":
            return "Today's Task";
            break;
        case "completed":
            return "Completed Task";
            break;
        default:
            return "All Task";
            break;
    }
});

const filteredAndSortedTasks = computed(() => {
    const filteredTasks = taskList.value.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    const sortedTask = sortTask([...filteredTasks], sortOption.value);

    const completedTask = sortedTask.filter((task) => task.is_completed);
    const nonCompletedTask = sortedTask.filter((task) => !task.is_completed);
    return [...nonCompletedTask, ...completedTask];
});

function sortTask(array, sort) {
    if (sort === "dueDate") {
        return array.sort(
            (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );
    } else if (sort === "priority") {
        return array.sort((a, b) => {
            if (a.priority === b.priority) {
                return new Date(a.due_date) - new Date(b.due_date);
            }
            return PRIORITY_MAP[a.priority] - PRIORITY_MAP[b.priority];
        });
    } else if (sort === "alphabetical_dsc") {
        return array.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "alphabetical_asc") {
        return array.sort((a, b) => b.title.localeCompare(a.title));
    }

    return array;
}

function populateTaskAndTitle() {
    switch (route.query.filter) {
        case "today":
            taskList.value = store.tasksDueToday;
            break;
        case "completed":
            taskList.value = store.completedTasks;
            break;
        default:
            taskList.value = store.tasks;
            break;
    }
}

function redirectToTodayTasks() {
    router.push({ ...route, query: { filter: "today" } });
}

onMounted(() => {
    store.fetchUser().then(() => {
        if (!store.isAuthenticated) router.push("/login");
        if (store.tasksDueToday.length > 0) {
            toast.warning(
                `You have ${store.tasksDueToday.length} tasks due today.`,
                { autoClose: 10000, onClick: redirectToTodayTasks }
            );
        }
        populateTaskAndTitle(route.query.filter);
    });
});

watch(
    () => [route.query.filter, store._tasks],
    () => {
        populateTaskAndTitle();
    }
);
</script>

<style scoped>
.dashboard-wrapper {
    display: flex;
    min-height: 100vh;
}

.tasks-wrapper {
    flex-grow: 1;
    padding: 2rem;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
}

button {
    display: block;
    padding: 10px;
    margin-left: auto;
    border: none;
    border-radius: 5px;
    background-color: var(--primary);
    color: white;
}

.task-list-container {
    margin-top: 1rem;
}

h1 {
    color: var(--dark);
}
</style>
