<template>
    <div class="sidebar">
        <ul>
            <li>Link 1</li>
            <li>Link 1</li>
            <li>Link 1</li>
            <li>Link 1</li>
            <button @click="logout">Log out</button>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "../store/store";

const store = useStore();
const router = useRouter();

function logout() {
    store.logout().then(() => {
        router.push("/login");
    });
}
</script>
<style scoped>
.sidebar {
    padding: 2rem;
    width: 10rem;
    background-color: var(--grey);
}

@media only screen and (max-width: 600px) {
    .sidebar {
        display: none;
    }
}
</style>
