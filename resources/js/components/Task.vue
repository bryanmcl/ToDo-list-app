<template>
    <div class="task-container">
        <label class="task-title">
            <input type="checkbox" v-model="isChecked" />
            <h2>{{ props.title }}</h2>
        </label>

        <div class="label-wrapper">
            <label class="date-label">
                <ClockIcon class="icon" />
                {{ formatDateTime(props.dueDate) }}
            </label>
            <label :class="['priority-label', priorityClass]">
                <span>{{ props.priority }}</span>
            </label>
        </div>

        <div class="floating-icon-wrapper">
            <button class="floating-icon" @click="editTask">
                <PencilIcon class="icon" />
            </button>
            <button class="floating-icon" @click="deleteTask">
                <TrashIcon class="icon" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ClockIcon, TrashIcon, PencilIcon } from "@heroicons/vue/16/solid";
import { computed, ref, watch } from "vue";
import { useStore } from "../store/store";
import { formatDateTime } from "../utils/date";
import { toast } from "vue3-toastify";

const store = useStore();

const props = defineProps({
    id: {
        type: Number,
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

const emit = defineEmits(["editTask"]);

const isChecked = ref(!!props.isCompleted);

watch(
    () => isChecked.value,
    (newValue) => {
        store.updateTask(props.id, { is_completed: newValue });
    }
);

const priorityClass = computed(() => {
    switch (props.priority) {
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
    store
        .deleteTask(props.id)
        .then(() => {
            toast.success("Data deleted successfuly");
        })
        .catch(() => {
            toast.error("Failed to delete data");
        });
}

function editTask() {
    emit("editTask", props.id);
}
</script>

<style lang="scss" scoped>
.task-container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 15px 0;
    padding: 15px;
    min-height: 80px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 2px 2px 5px 2px var(--grey);

    .task-title {
        display: flex;
        align-items: center;
        width: 90%;
        gap: 10px;
        cursor: pointer;
        flex-grow: 1;

        h2 {
            font-weight: 600;
            font-size: 18px;
            overflow-wrap: break-word;
            word-break: break-all;
        }

        input:checked ~ h2 {
            text-decoration: line-through;
        }
    }

    .label-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: end;

        .date-label {
            color: var(--primary);
            .icon {
                vertical-align: bottom;
                width: 20px;
                height: 20px;
            }
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
    }

    .floating-icon-wrapper {
        display: flex;
        gap: 0.5rem;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;

        .floating-icon {
            border: none;
            background: none;
            padding: 5px;
            font-weight: bold;
            border-radius: 100%;
            cursor: pointer;

            &:hover {
                background-color: var(--grey);
            }

            .icon {
                width: 20px;
                height: 20px;
            }
        }
    }
}

@media only screen and (max-width: 700px) {
    .priority-label span {
        display: none;
    }
}
</style>
