<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="hero-section">
        <div class="hero-wrapper">
            <h1 class="hero-title">Create task, plan ahead.</h1>
            <p class="hero-sub">
                Organize your task with our to do list application.
            </p>
            <div class="action-buttons">
                <RouterLink class="highlight" to="/login">Sign In</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.hero-section {
    display: grid;
    place-items: center;
    min-height: 100vh;
    max-width: 800px;
    padding: 2rem;
    box-sizing: border-box;
    margin: 0 auto;

    .hero-title {
        font-size: clamp(4rem, 9vw, 7rem);
        margin-bottom: 1rem;
        text-align: center;
    }

    .hero-sub {
        font-size: 2rem;
        color: rgb(134, 134, 134);
        text-align: center;
    }

    .action-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;

        a {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            color: white;

            &:not(.highlight) {
                background-color: var(--primary);
            }

            &.highlight {
                background-color: var(--primary);
            }
        }
    }
}
</style>
