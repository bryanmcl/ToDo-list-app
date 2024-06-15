<template>
    <div class="sidebar">
        <ul>
            <li v-for="item in linkItems" class="link-item">
                <RouterLink :to="{ path: item.path, query: item.query }">
                    <component :is="item.icon" class="icon" />
                    {{ item.label }}
                </RouterLink>
            </li>
            <div class="fill-block"></div>
            <button @click="logout"><PowerIcon class="icon" /> Log out</button>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "../store/store";
import {
    PowerIcon,
    CheckIcon,
    ClipboardDocumentListIcon,
    SunIcon
} from "@heroicons/vue/16/solid";

const store = useStore();
const router = useRouter();

const linkItems = [
    { icon: SunIcon, label: "Today's Tasks", path: "/task-list", query: { filter: "today" } },
    { icon: ClipboardDocumentListIcon, label: "All Tasks", path: "/task-list" },
    {
        icon: CheckIcon,
        label: "Completed Tasks",
        path: "/task-list",
        query: { filter: "completed" },
    },
];

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

    ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        list-style: none;

        .link-item {
            font-weight: bold;
            border-radius: 5px;
            background-color: rgb(48, 52, 54);

            a {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px 10px;
                color: white;
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

            &:hover {
            }
        }

        .icon {
            width: 25px;
            height: 25px;
        }
    }
}

@media only screen and (max-width: 700px) {
    .sidebar {
        display: none;
    }
}
</style>
