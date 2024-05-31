<template>
    <div
      class="block"
      @pointerdown="startDragging"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousemove="onMouseMove"
      :style="blockStyle"
      ref="block"
    >
        <span contenteditable="true" class="input_block" ref="editableText">{{ editableText }}</span>
        <!-- <p @dblclick="enableEditing" v-if="!isEditing" class="input_block">{{ editableText }}</p>
        <input v-else v-model="editableText" @blur="saveText" @keyup.enter="saveText" class="input_block"/> -->
    </div>
  </template>



<script setup>


    const BLOCK_STYLE_VALUES = {
        "blockIsDragingColor": "#D33131"
    }


    import { ref, inject, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

    const Left_panel_width = inject('Left_panel_width').value;
    const Up_panel_height = inject('Up_panel_height').value;


    const props = defineProps({
        text: String,
    });

    const position = reactive({ x: 0, y: 0 });
    const offset = reactive({ x: 0, y: 0 });
    const boxShadow = ref('none');
    const isDragging = ref(false);


    const isEditing = ref(false);
    const editableText = ref(`${props.text}`);

    const blockStyle = computed(() => ({
        transform: `translate(${position.x}px, ${position.y}px)`,   
        boxShadow: boxShadow.value,
        transition: isDragging.value ? 'transform 0.1s' : 'box-shadow 0.6s ease-in-out',
    }));

    let animationFrame;


    // Main events
    const onMouseMove = () => {

        if (isDragging.value)
        {
            changeBoxShadow(`0 5px 25px ${BLOCK_STYLE_VALUES.blockIsDragingColor}`);
        }
        else
        {
            changeBoxShadow('0 5px 25px #cb31ff');
        }

    };

    const onMouseEnter = () => {
        changeBoxShadow('0 5px 25px #cb31ff');
    };

    const onMouseLeave = () => {
        checkBoxShadow() // Или другой эффект по умолчанию
    };

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

    // functions for work with text
    const enableEditing = () => {
        isEditing.value = true;
        nextTick(() => {
            const input = document.querySelector('input');
            if (input) {
                input.focus();
                input.select();
            }
        });
    };  

    const saveText = () => {
        isEditing.value = false;
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
    position: fixed;
    cursor: grab;
    min-width: 100px;
    min-height: 100px;
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

.input_block {
    background: transparent;
    width: 100%;
    height: 100%;
    border: none;
    color: #6f00c9;
    font-family: 'Roboto', Arial, sans-serif;
    font-weight: bold;
    outline: none;
}

</style>