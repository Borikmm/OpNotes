<script setup>

import { inject } from 'vue'

const props = defineProps({
    imageUrl: String,
    nameComponent: String
})
 

const GlobalBlocksList = inject('GlobalBlocksList').value

function spawn_block()
{
    GlobalBlocksList.push(props.nameComponent);
}

</script>

<template>
    <div className="EnteractiveComponent" @click="spawn_block()">
        <img :src="imageUrl" className="EnteractiveImage"/>
        <h4 className="Name_component">{{nameComponent}}</h4>
    </div>
</template>

<style>

.EnteractiveComponent{
    display: block;
    width: 100%;
    height: 80px;
    transition: transform 0.2s;
}

.EnteractiveComponent:hover {
  transform: translateX(7px); /* сдвигаем блок на 10px вправо при наведении */
}



.EnteractiveImage {
    width: 40px;
    height: 40px;
}

.Name_component {
    font-size: 10px;
    margin: 0;
    color: blueviolet;
    cursor: default;
}


</style>