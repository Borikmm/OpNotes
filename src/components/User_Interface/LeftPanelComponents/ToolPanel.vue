<script setup>

import EnteractiveComponent from "../../Spawn_Elements/InteractiveComponent.vue";


</script>


<template>

    <div id="ToolPanel">
        <EnteractiveComponent image-url="public/favicon.ico" name-component="Main block" v-bind:animated="true"/>
        <EnteractiveComponent image-url="public/favicon.ico" name-component="Line" v-bind:animated="true"/>
        <EnteractiveComponent image-url="public/favicon.ico" name-component="Test" v-bind:animated="true"/>
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