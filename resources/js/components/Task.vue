<template>
    <div class="task-container">
        <div class="task-title">
            <input type="checkbox" />
            <h2>Task 1 Water the plant or something</h2>
        </div>
        
        <div class="label-wrapper">
            <label class="date-label">
                <ClockIcon class="icon" />
                14/06/24 00:00
            </label>
            <label class="priority-label">Important</label>
        </div>
    </div>
</template>

<script setup>
    import { ClockIcon } from '@heroicons/vue/16/solid';
</script>

<style scoped>
.task-container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 15px 0;
    padding: 15px;
    height: 80px;

    border-radius: 5px;
    box-shadow: 2px 2px 5px 2px var(--grey);
}

.task-container .task-title {
    display: flex;
    align-items: center;
    width: 90%;
    gap: 10px;
    cursor: pointer;
    flex-grow: 1;
}

.task-container h2 {
    font-weight: 600;
    font-size: 18px;
}

.label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: end;

}

.label-wrapper .date-label {
    color: var(--primary);
}

.icon {
    vertical-align: bottom;
    width: 20px;
    height: 20px;
}

.priority-label {
    padding: 5px 20px;
    border-radius: 100px;
    color: var(--light);
    background-color: rgb(138, 21, 21);
}

.elipsis-button {
    position: absolute;
    top: 5px;
    right: 12px;
    border: none;
    background: none;
    padding: 5px;
    font-weight: bold;
    border-radius: 100%;
    cursor: pointer;
}

.elipsis-button:hover {
    background-color: var(--grey);
}
</style>