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

<style lang="scss" scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    min-height: 100vh;
    background-color: var(--light-grey);

    .form-wrapper {
        flex-grow: 1;
        max-width: 400px;
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        h2 {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            text-align: center;
        }

        .input-wrapper {
            margin-top: 1rem;

            label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: bold;
            }

            input {
                display: block;
                width: 100%;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                border: 1px solid var(--grey);
                border-radius: 0.5rem;
                font-size: 1rem;
                box-sizing: border-box;

                &:focus {
                    border-color: var(--primary);
                    outline: none;
                }
            }
        }

        button {
            width: 100%;
            padding: 0.75rem;
            margin-top: 1.5rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                background-color: rgb(49, 77, 168);
            }
        }
    }
}
</style>
