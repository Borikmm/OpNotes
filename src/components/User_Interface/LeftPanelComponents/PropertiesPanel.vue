<script setup>

import EnteractiveComponent from "../../Spawn_Elements/InteractiveComponent.vue";


</script>


<template>

    <div id="ToolPanel">
        <EnteractiveComponent image-url="src//media/grad.jpg" name-component="Color" v-bind:animated="false" properties-menu="color"/>
    </div>



</template>




<style scoped>

#ToolPanel {
    width: 100%;
    background-color: rgb(31, 30, 30);
    height: 100%;
    margin: 0;
    color: black;
    margin-top: 20px;
    z-index: var(--z-index-toolbar);
}


</style>