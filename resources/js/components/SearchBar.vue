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

<style lang="scss" scoped>
.search-bar-wrapper {
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    margin: 15px 0;

    .search-bar {
        flex-grow: 1;
    }

    input[type="text"],
    select {
        padding: 0.75rem;
        box-sizing: border-box;
        border: 2px solid var(--grey);
        border-radius: 0.5rem;
        font-size: 1rem;
        width: 100%;
    }
}

@media only screen and (max-width: 700px) {
    .search-bar-wrapper {
        padding: 0;
        background: none;
        gap: 10px;

        .search-bar {
            flex-grow: 1;
        }

        input[type="text"],
        select {
            border-radius: 30px;
            border: 2px solid var(--grey);
        }
    }
}
</style>
