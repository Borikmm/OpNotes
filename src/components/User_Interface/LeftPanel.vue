<script setup>

import ToolPanel from "./LeftPanelComponents/ToolPanel.vue";
import PropertiesPanel from "./LeftPanelComponents/PropertiesPanel.vue";
import { inject, onMounted, ref } from 'vue'
import { Service } from "@/Scripts/MainServices/Service";


inject('Left_panel_width').value = 72;


const ToogleMenusService = new Service().ToogleMenusService;
const ToolPanelBlock = ref(null);
const PropertiesPanelBlock = ref(null);

onMounted(() => {
    ToogleMenusService.SetterService({
        "ToolsPanel": ToolPanelBlock,
        "PropertiesPanel": PropertiesPanelBlock
    })
});

</script>

<template>
    <div className="LeftPanel">
        <div className="Toolbar">

            <div className="Panel Tools" ref="ToolPanelBlock">
                <ToolPanel/>
            </div>
            <div className="Panel Properties" ref="PropertiesPanelBlock">
                <PropertiesPanel/>
            </div>





        </div>
    </div>
</template>


<style scoped>


.Panel {
    position: absolute;
    transition: transform 0.2s;
}


.Panel.Tools {

}

.Panel.Properties{
    transform: translateX(-100px);
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