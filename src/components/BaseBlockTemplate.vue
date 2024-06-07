<template>
    <div
      class="block"
      @pointerdown="startDragging"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousemove="onMouseMove"
      @dblclick="enableEditing"
      :style="blockStyle"
      ref="block"
    >
        <!--  -->
    </div>
  </template>



<script setup>


const BLOCK_STYLE_VALUES = {
        "blockIsDragingColor": "#D33131"
}


import { ref, inject, reactive, computed, onMounted, onBeforeUnmount} from 'vue';

const Left_panel_width = inject('Left_panel_width').value;
const Up_panel_height = inject('Up_panel_height').value;



const position = reactive({ x: 0, y: 0 });
const offset = reactive({ x: 0, y: 0 });
const boxShadow = ref('none');
const isDragging = ref(false);

const blockStyle = computed(() => ({
        transform: `translate(${position.x}px, ${position.y}px)`,   
        transition: isDragging.value ? 'transform 0.1s' : 'box-shadow 0.6s ease-in-out',
}));

    let animationFrame;


// Main events
const onMouseMove = () => {

    if (isDragging.value)
    {

    }
    else
    {

    }

};

const onMouseEnter = () => {
    changeBoxShadow('0 5px 25px #cb31ff');
};

const onMouseLeave = () => {
    checkBoxShadow() // Или другой эффект по умолчанию
};
//



    // Functions for dragging
const startDragging = (event) => {

if (isEditing.value) {
    return; // Не начинаем перетаскивание, если режим редактирования включен
}

const blockRect = event.currentTarget.getBoundingClientRect();
offset.x = event.clientX - blockRect.left;
offset.y = event.clientY - blockRect.top;
isDragging.value = true;

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', stopDragging);

changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockIsDragingColor}`);
};

const onPointerMove = (event) => {
if (isDragging.value) {
    position.x = event.clientX - offset.x - Left_panel_width;
    position.y = event.clientY - offset.y - Up_panel_height;

    if (!animationFrame) {
        animationFrame = requestAnimationFrame(updatePosition);
    }
}
};

const updatePosition = () => {
animationFrame = null;
};

const stopDragging = () => {
isDragging.value = false;
window.removeEventListener('pointermove', onPointerMove);
window.removeEventListener('pointerup', stopDragging);
cancelAnimationFrame(animationFrame);
animationFrame = null;

changeBoxShadow('none');
};
//


    // functions for work with box shadow
    const changeBoxShadow = (newBoxShadow) => {
        boxShadow.value = newBoxShadow;
    };
 

    const checkBoxShadow = () => {
        if (!isDragging.value) {
            changeBoxShadow('none');
        }
    };
    //


    // service functions
    onMounted(() => {
        window.addEventListener('pointerup', stopDragging);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', stopDragging);
    });
    //


</script>



<style scoped>

.block {
    z-index: 10;
    position: fixed;
    cursor: grab;

    background: #257ccd;
    padding: 20px;
    margin: auto;
    border-radius: 10px;


    display: inline;


    transition: 0.1;
    user-select: none;
}



.block:active{
    cursor: grabbing;
}


</style>