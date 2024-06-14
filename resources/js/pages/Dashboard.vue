<template>
    <div class="dashboard-wrapper">
        <Sidebar />
        <div class="tasks-wrapper">
            <h1>Task List</h1>
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
                    v-model:isCompleted="task.is_completed"
                />
            </div>
        </div>
    </div>

    <CreateModal :isVisible="isModalVisible" @close="isModalVisible = false" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import CreateModal from "../components/CreateModal.vue";
import Sidebar from "../components/Sidebar.vue";
import Task from "../components/Task.vue";
import SearchBar from "../components/SearchBar.vue";
import { useStore } from "../store/store";
import { useRouter } from "vue-router";

const PRIORITY_MAP = {
    high: 1,
    medium: 2,
    low: 3,
};

const store = useStore();
const router = useRouter();

const isModalVisible = ref(false);
const searchQuery = ref("");
const sortOption = ref("dueDate");

const filteredAndSortedTasks = computed(() => {
    const filteredTasks = store.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    const sortedTask = sortTask([...filteredTasks], sortOption.value);

    const completedTask = sortedTask.filter((task) => task.is_completed);
    const nonCompletedTask = sortedTask.filter((task) => !task.is_completed);
    return [...nonCompletedTask, ...completedTask];
});

onMounted(() => {
    store.fetchUser();

    if (!store.isAuthenticated) {
        router.push("/login");
    }
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
</script>

<style scoped>
.dashboard-wrapper {
    display: flex;
    min-height: 100vh;
}

.tasks-wrapper {
    flex-grow: 1;
    padding: 2rem;
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
