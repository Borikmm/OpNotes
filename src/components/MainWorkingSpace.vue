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
        <div v-for="(name_element, index) in GlobalBlocksList" :key="index" :class="name_element">
            <component :is="getComponent(name_element)" :text="GlobalBlocksList[index]"/>
        </div>
    </div>  

</template>


<script setup>

    import { inject } from 'vue'

    import MainInteractBlockTemplate from './MainBlockTemplate.vue'

    import LineBlockTemplate from './LineTemplate.vue'

    const GlobalBlocksList = inject('GlobalBlocksList').value;


    const getComponent = (name_element) => {
        switch (name_element) {
            case 'Main block':
                return MainInteractBlockTemplate;
            case 'Line':
                return LineBlockTemplate;
            // Добавьте другие компоненты здесь
            default:
                return null; // Или компонент по умолчанию
        }
    };



</script>