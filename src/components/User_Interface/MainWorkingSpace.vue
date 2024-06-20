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
        z-index: 0;
    }

</style>

<template>
    <div className="Main_Space" @dblclick="onMainSpaceDblClick">
        <div v-for="(name_element, index) in GlobalBlocksList" :key="index" :class="name_element">
            <component :is="getComponent(name_element)" :text="GlobalBlocksList[index]"/>
        </div>
    </div>  

</template>


<script setup>

    import { inject } from 'vue'

    import MainInteractBlockTemplate from '../Spawn_Elements/MainBlockTemplate.vue'

    import LineBlockTemplate from '../Spawn_Elements/LineTemplate.vue'

    import TestBlock from '../Spawn_Elements/TestBlock.vue'
    import { Service } from '@/Scripts/MainServices/Service';

    const GlobalBlocksList = inject('GlobalBlocksList').value;

    const DataService = new Service().DataService;

    const onMainSpaceDblClick = (event) => {
        DataService.changeSelectedBlock(0);
    }


    const getComponent = (name_element) => {
        switch (name_element) {
            case 'Main block':
                return MainInteractBlockTemplate;
            case 'Line':
                return LineBlockTemplate;
            case 'Test':
                return TestBlock;
            // Добавьте другие компоненты здесь
            default:
                return null; // Или компонент по умолчанию
        }
    };



</script>