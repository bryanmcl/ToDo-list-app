<template>
    <div class="sidebar">
        <ul>
            <li>Link 1</li>
            <li>Link 1</li>
            <li>Link 1</li>
            <li>Link 1</li>
        </ul>
    </div>
</template>

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