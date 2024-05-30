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
                <EnteractiveComponent image-url="../../public/favicon.ico" name-component="Comment"/>
            </div>



        </div>
    </div>
</template>


<style scoped>

#ToolPanel {
    width: 100%;
    background-color: "#232323";
    height: 100%;
    margin: 0;
    color: black;
    margin-top: 20px;
}


.Toolbar {
    border-right: 2px solid;
    border-color: rgb(41, 41, 41);
    -ms-flex-align: center;
    -ms-flex-pack: justify;
    width: 60px;
    height: 100%;
    align-items: center;
    background: var(--ws-canvas-background);
    box-shadow: 1px 0 0 0 var(--ws-section-divider-color);
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 10px;
    justify-content: space-between;
    position: relative;
    text-align: center;
    transform: translateZ(0);
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    transition-delay: .3s;
    width: 72px;
    z-index: var(--z-index-toolbar);
}


</style>