<template>
    <ul class="sidebar">
        <li
            v-for="item in linkItems"
            :class="['link-item', { 'is-active': isActive(item) }]"
        >
            <RouterLink :to="{ path: item.path, query: item.query }">
                <component :is="item.icon" class="icon" />
                {{ item.label }}
            </RouterLink>
        </li>
        <div class="fill-block"></div>
        <button @click="logout"><PowerIcon class="icon" /> Log out</button>
    </ul>

    <!-- Mobile Navbar -->
    <ul class="navbar">
        <li
            v-for="item in linkItems"
            :class="['link-item', { 'is-active': isActive(item) }]"
        >
            <RouterLink :to="{ path: item.path, query: item.query }">
                <component :is="item.icon" class="icon" />
            </RouterLink>
        </li>
        <button @click="logout"><PowerIcon class="icon" /></button>
    </ul>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store/store";
import {
    PowerIcon,
    CheckIcon,
    ClipboardDocumentListIcon,
    SunIcon,
} from "@heroicons/vue/16/solid";

const store = useStore();
const router = useRouter();
const route = useRoute();

const linkItems = [
    {
        icon: SunIcon,
        label: "Today's Tasks",
        path: "/task-list",
        query: { filter: "today" },
    },
    { icon: ClipboardDocumentListIcon, label: "All Tasks", path: "/task-list" },
    {
        icon: CheckIcon,
        label: "Completed Tasks",
        path: "/task-list",
        query: { filter: "completed" },
    },
];

function isActive(item) {
    return (
        route.path === item.path && route.query.filter === item.query?.filter
    );
}

function logout() {
    store.logout().then(() => {
        router.push("/login");
    });
}
</script>
<style lang="scss" scoped>
.sidebar {
    padding: 1rem;
    min-width: 15rem;
    background-color: var(--dark);
    display: flex;
    flex-direction: column;
    gap: 15px;
    list-style: none;

    .link-item {
        border-radius: 5px;
        background-color: rgb(48, 52, 54);

        a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px 10px;
            color: white;
            font-weight: bold;
        }

        &.is-active {
            background-color: var(--primary);
        }

        &:hover {
            background-color: var(--primary);
        }
    }

    .fill-block {
        flex: 1;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        padding: 20px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 5px;
        border: none;
        background-color: var(--primary);
        color: white;
        cursor: pointer;

        &:hover {
            background-color: rgb(49, 77, 168);
        }
    }
}

.navbar {
    position: fixed;
    bottom: 0;
    z-index: 997;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: none;
    grid-template-columns: repeat(3, 1fr) auto;
    gap: 10px;
    list-style: none;
    background-color: var(--dark);

    li {
        border-radius: 5px;
        padding: 10px;
        a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
        }

        &.is-active {
            background-color: var(--primary);
        }
    }

    button {
        width: 50px;
        border-radius: 5px;
        border: none;
        background-color: var(--primary);
        font-size: 12px;
        color: white;
    }
}

.icon {
    width: 25px;
    height: 25px;
}

@media only screen and (max-width: 700px) {
    .sidebar {
        display: none;
    }

    .navbar {
        display: grid;
    }
}
</style>
