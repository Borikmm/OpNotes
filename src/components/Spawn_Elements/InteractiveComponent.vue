<script setup>

import { inject, ref } from 'vue'


const this_block = ref(null);

const props = defineProps({
    imageUrl: String,
    nameComponent: String,
    animated: Boolean,
    propertiesMenu: String
})
 

const GlobalBlocksList = inject('GlobalBlocksList').value

function spawn_block()
{
    if (props.propertiesMenu != null)
    {
        console.log("ef");
    }
    else
    {
        GlobalBlocksList.push(props.nameComponent);
    }
}


function handleMouseOver() {

    if (props.animated)
    {
        this_block.value.style.transform = "translateX(7px)";
    }
    // Добавьте действия при наведении мыши здесь
}

function handleMouseLeave() {
    this_block.value.style.transform = "translateX(0px)";
}


</script>

<template>
    <div @mouseover="handleMouseOver"
         @mouseleave="handleMouseLeave"
         className="EnteractiveComponent"
         @click="spawn_block()"
         ref="this_block">
         
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