<template>
    <div class="task-container">
        <label class="task-title">
            <input type="checkbox" v-model="isChecked" />
            <h2>{{ title }}</h2>
        </label>

        <div class="label-wrapper">
            <label class="date-label">
                <ClockIcon class="icon" />
                {{ dueDate }}
            </label>
            <label :class="['priority-label', priorityClass]">{{
                priority
            }}</label>
        </div>

        <button class="delete-btn" @click="deleteTask">
            <TrashIcon class="icon" />
        </button>
    </div>
</template>

<script setup>
import { ClockIcon, TrashIcon } from "@heroicons/vue/16/solid";
import { computed, ref, watch } from "vue";
import { useStore } from "../store/store";

const store = useStore();

const { id, title, dueDate, priority, isCompleted } = defineProps({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        default: "",
    },
    priority: {
        type: String,
        default: "low",
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:isCompleted", "deleteTask"]);

const isChecked = ref(!!isCompleted);

watch(
    () => isChecked.value,
    (newValue) => {
        emit("update:isCompleted", newValue);
    }
);

const priorityClass = computed(() => {
    switch (priority) {
        case "low":
            return "priority-low";
        case "medium":
            return "priority-medium";
        case "high":
            return "priority-high";
        default:
            return "";
    }
});

function deleteTask() {
    store.deleteTask(id);
}
</script>

<style scoped>
.task-container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 15px 0;
    padding: 15px;
    height: 80px;

    border-radius: 5px;
    background-color: white;
    box-shadow: 2px 2px 5px 2px var(--grey);
}

.task-container .task-title {
    display: flex;
    align-items: center;
    width: 90%;
    gap: 10px;
    cursor: pointer;
    flex-grow: 1;
}

.task-container h2 {
    font-weight: 600;
    font-size: 18px;
}

input:checked ~ h2 {
    text-decoration: line-through;
}

.label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.label-wrapper .date-label {
    color: var(--primary);
}

.icon {
    vertical-align: bottom;
    width: 20px;
    height: 20px;
}

.priority-label {
    padding: 5px 20px;
    border-radius: 100px;
    color: white;
}

.priority-low {
    background-color: rgb(76, 192, 76);
}

.priority-medium {
    background-color: rgb(255, 193, 78);
}

.priority-high {
    background-color: rgb(255, 105, 105);
}

.delete-btn {
    position: absolute;
    top: 5px;
    right: 12px;
    border: none;
    background: none;
    padding: 5px;
    font-weight: bold;
    border-radius: 100%;
    cursor: pointer;
}

.delete-btn:hover {
    background-color: var(--grey);
}
</style>
