<template>
    <div class="search-bar-wrapper">
        <div class="search-bar">
            <input
                v-model="filter.query"
                type="text"
                placeholder="Search for task..."
            />
        </div>
        <div class="sort-wrapper">
            <select v-model="filter.sort">
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="alphabetical_dsc">A - Z</option>
                <option value="alphabetical_asc">Z - A</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { debounce } from "lodash";
import { reactive, watch } from "vue";

const emit = defineEmits(["update:searchQuery", "update:sortOption"]);

const { searchQuery, sortOption } = defineProps({
    searchQuery: {
        type: String,
        default: "",
    },
    sortOption: {
        type: String,
        default: "",
    },
});

const filter = reactive({
    query: searchQuery,
    sort: sortOption,
});

watch(
    () => filter.query,
    (newValue) => {
        debounceEmit(newValue);
    }
);
watch(
    () => filter.sort,
    (newValue) => {
        emit("update:sortOption", newValue);
    }
);

const debounceEmit = debounce((newValue) => {
    emit("update:searchQuery", newValue);
}, 300);
</script>

<style scoped>
.search-bar-wrapper {
    display: flex;
    gap: 20px;
    background-color: var(--light-grey);
    padding: 10px;
    box-sizing: border-box;
    margin: 15px 0;
}

.search-bar {
    flex-grow: 1;
}

.search-bar input {
    width: 100%;
}
</style>
