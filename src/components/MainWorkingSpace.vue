<style scoped>
    .Main_Space{
        background-image: url('/src/media/2.jpg');
        background-size: 500px;
        background-position: center;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
    }

</style>

<template>
    <div className="Main_Space">
        <div v-for="(name_element, index) in GlobalBlocksList" v-bind:key="index" class="See_blocks">
            <MainInteractBlockTemplate style="color: red;" :text="GlobalBlocksList[index]" />
        </div>
    </div>  

</template>


<script setup>

    import { inject } from 'vue'

    import MainInteractBlockTemplate from './MainBlockTemplate.vue'

    const GlobalBlocksList = inject('GlobalBlocksList').value;

</script>