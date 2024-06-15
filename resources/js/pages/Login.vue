<template>
    <div class="login-wrapper">
        <div class="form-wrapper">
            <div>
                <h2>Sign In</h2>
                <div class="input-wrapper">
                    <label>Email</label>
                    <input v-model="form.email" type="email" />
                </div>
                <div class="input-wrapper">
                    <label>Password</label>
                    <input v-model="form.password" type="password" />
                </div>

                <button @click="handleSignIn">Sign Up</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/store";

const store = useStore();
const router = useRouter();

const form = reactive({
    email: "",
    password: "",
});

async function handleSignIn() {
    store.login(form).then(() => {
        router.push("/task-list");
    });
}
</script>

<style scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    min-height: 100vh;
    background-color: var(--light-grey);
}

.form-wrapper {
    flex-grow: 1;
    max-width: 400px;
    background-color: white;
    padding: 2rem;
}

.input-wrapper {
    margin-top: 15px;
}

.input-wrapper input {
    display: block;
    width: 100%;
    margin: 10px 0;
}
</style>
