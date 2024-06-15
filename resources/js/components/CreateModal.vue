<template>
    <div v-if="isVisible" class="modal-wrapper">
        <form>
            <input v-model="form.title" type="text" placeholder="Task name" />
            <input v-model="form.due_date" type="datetime-local" />
            <select v-model="form.priority">
                <option disabled selected value="">Select priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </form>

        <div class="action-button">
            <button @click="onClickCancel" class="cancel">Cancel</button>
            <button @click="handleAddTask">Add Task</button>
        </div>
    </div>
    <div v-if="isVisible" class="overlay"></div>
</template>

<script setup>
import {
    computed,
    onActivated,
    onBeforeMount,
    onUpdated,
    reactive,
    watch,
} from "vue";
import { useStore } from "../store/store";
import { toast } from "vue3-toastify";

const store = useStore();

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
    task: {
        type: Object,
        default: {},
    },
});

const emit = defineEmits(["close", "taskCreated"]);

const form = reactive({
    title: "",
    due_date: "",
    priority: "",
});

const savePayload = computed(() => {
    return {
        user_id: store.user.id,
        title: form.title,
        due_date: form.due_date,
        priority: form.priority,
        is_completed: false,
    };
});

function resetForm() {
    form.title = "";
    form.due_date = "";
    form.priority = "";
}

function handleAddTask() {
    if (!props.task) {
        store
            .addTask(savePayload.value)
            .then(() => {
                toast.success("Task added successfuly");
            })
            .catch((error) => {
                console.log("error: ", error.response.data.message);
                toast.error(
                    `Failed to create task. ${error.response.data.message}`
                );
            });
    } else {
        store
            .updateTask(props.task.id, savePayload.value)
            .then(() => {
                toast.success("Task updated successfuly");
            })
            .catch((error) => {
                console.log("error: ", error.response.data.message);
                toast.error(
                    `Failed to update task. ${error.response.data.message}`
                );
            });
    }

    resetForm();
    emit("close");
}

function onClickCancel() {
    resetForm();
    emit("close");
}

watch(
    () => props.task,
    (newTask) => {
        form.title = newTask?.title || "";
        form.due_date = newTask?.due_date || "";
        form.priority = newTask?.priority || "";
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
    height: 100vh;
    width: 100%;
    z-index: 998;
}

.modal-wrapper {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    background-color: white;
    width: 90%;
    max-width: 600px;
    min-height: 200px;
    z-index: 999;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input[type="text"],
    input[type="datetime-local"],
    select {
        padding: 0.75rem;
        box-sizing: border-box;
        border: 2px solid var(--grey);
        border-radius: 0.5rem;
        font-size: 1rem;
    }

    input:focus,
    select:focus {
        outline: none;
        border-color: var(--primary);
    }

    .action-button {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;

        button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;

            &.cancel {
                background-color: grey;
                color: white;
            }

            &:not(.cancel) {
                background-color: var(--primary);
                color: white;
            }
        }
    }
}
</style>
