<template>
    <div class="register-wrapper">
        <div class="form-wrapper">
            <div>
                <h2>Sign Up</h2>
                <div class="input-wrapper">
                    <label>Name</label>
                    <input v-model="form.name" type="text" />
                </div>
                <div class="input-wrapper">
                    <label>Email</label>
                    <input v-model="form.email" type="email" />
                </div>
                <div class="input-wrapper">
                    <label>Password</label>
                    <input v-model="form.password" type="password" />
                </div>

                <button @click="handleSignUp">Sign Up</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";

const form = reactive({
    name: "",
    email: "",
    password: "",
});

async function handleSignUp() {
    console.log(form);
    await axios
        .post("/api/auth/register", form)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>

<style scoped>
.register-wrapper {
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
