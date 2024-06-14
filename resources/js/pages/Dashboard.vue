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
                <Task v-for="task in sortedTasks"
                    :key="task.id" 
                    :id="task.id"
                    :title="task.title" 
                    :dueDate="task.due_date"
                    :priority="task.priority"
                    v-model:isCompleted="task.is_completed"
                    @deleteTask="deleteTask"
                />
            </div>
        </div>
    </div>

    <CreateModal 
        :isVisible="isModalVisible"
        @close="isModalVisible = false"
        @taskCreated="addTaskToList"
    />

</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import CreateModal from '../components/CreateModal.vue';
import Sidebar from '../components/Sidebar.vue'
import Task from '../components/Task.vue';
import axios from 'axios';


const isModalVisible = ref(false);
const tasks = ref([]);

const sortedTasks = computed(() => {
    const completedTask = tasks.value.filter(task => task.is_completed)
    const nonCompletedTask = tasks.value.filter(task => !task.is_completed)

    return [...nonCompletedTask, ...completedTask]
})

onMounted(() => {
    fetchTasks()
})

function fetchTasks() {
    axios.get('/api/tasks')
        .then(response => {
            tasks.value = response.data?.tasks
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            console.log('tasks fetched!')
        })
}

function addTaskToList(newTask) {
    tasks.value.push(newTask);
}

function deleteTask(id) {
    tasks.value.filter((task) => task.id !== id)
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
    color: var(--dark)
}
</style>