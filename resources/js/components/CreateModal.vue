<template>
    <div v-if="isVisible" class="modal-wrapper">
        <form>
            <input v-model="form.title" type="text" placeholder="Task name" />
            <input v-model="form.date" type="date" />
            <select v-model="form.priority">
                <option disabled selected value="">Select priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </form>


        <div class="action-button">
            <button @click="onClickCancel" class="cancel">
                Cancel
            </button>
            <button @click="handleAddtask">
                Add Task
            </button>
        </div>
    </div>
    <div v-if="isVisible" class="overlay"></div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const form = ref({
    title: '',
    date: '',
    priority: ''
})


function handleAddtask() {
    console.log(form.value);
}

function onClickCancel() {
    emit('close')
}
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 9;
    background-color: black;
    opacity: 0.5;
    height: 100vh;
    width: 100%;
    z-index: 998;
}

.modal-wrapper {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    background-color: white;
    width: 90%;
    max-width: 600px;
    min-height: 150px;
    z-index: 999;
    border-radius: 1rem;
}

form {
    flex-grow: 1;
}

input[type=text],
input[type=date],
select {
    padding: 10px;
    box-sizing: border-box;
    border: none;
    border-bottom: solid 2px var(--grey);
}

input:focus {
    outline: none;
}

input[type=text] {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

button {
    padding: 10px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary);
    color: white;
}

.action-button {
    margin-left: auto;
}

.cancel {
    background-color: grey
}
</style>