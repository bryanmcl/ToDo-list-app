<template>
    <div class="dashboard-wrapper">
        <Sidebar />
        <div class="tasks-wrapper">
            <h1>Task List</h1>
            <button
                @click="isModalVisible = true"
            >
                + Create New Task
            </button>
            <div class="task-list-container">
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    </div>

    <CreateModal 
        :isVisible="isModalVisible"
        @close="isModalVisible = false"
    />

</template>

<script setup>
import { ref } from 'vue';
import CreateModal from '../components/CreateModal.vue';
import Sidebar from '../components/Sidebar.vue'
import Task from '../components/Task.vue';

const isModalVisible = ref(false);
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
    color: var(--dark)
}
</style>