<script setup>

import EnteractiveComponent from "./InteractiveComponent.vue";
import { inject } from 'vue'


inject('Left_panel_width').value = 72;


</script>

<template>
    <div className="LeftPanel">
        <div className="Toolbar">

            <div id="ToolPanel">
                <EnteractiveComponent image-url="../../public/favicon.ico" name-component="Main block"/>
                <EnteractiveComponent image-url="../../public/favicon.ico" name-component="Line"/>
                <EnteractiveComponent image-url="../../public/favicon.ico" name-component="Test"/>
            </div>



        </div>
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


.Toolbar {
    border-right: 1px solid;
    border-color: black;
    background-color: rgb(31, 30, 30);
    -ms-flex-align: center;
    -ms-flex-pack: justify;
    width: 60px;
    height: 100%;
    align-items: center;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 10px;
    justify-content: space-between;
    position: relative;
    text-align: center;

    width: 72px;
    z-index: var(--z-index-toolbar);
}


</style>