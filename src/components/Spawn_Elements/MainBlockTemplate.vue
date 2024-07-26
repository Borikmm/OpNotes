<template>
    <div
      class="block draggable_block"
      ref="thisBlock"
      :style="blockStyle"
      @pointerdown="startDragging"
      @mouseleave="onMouseLeave"
      @dblclick="enableEditing"
      @mousemove="need"
    >
        <span contenteditable="false" class="input_block" ref="editableTextBlock">{{ editableText }}</span>
        <!-- <p @dblclick="enableEditing" v-if="!isEditing" class="input_block">{{ editableText }}</p>
        <input v-else v-model="editableText" @blur="saveText" @keyup.enter="saveText" class="input_block"/> -->
    </div>
</template>

<script setup>
    import { ref, inject, reactive, computed, onMounted, onBeforeUnmount} from 'vue';
    import { Service } from '@/Scripts/MainServices/Service';
    // Draggable
    import {getDraggable, startDraggable}  from '../../Scripts/Draggable/Draggable.js'; // Подключение класса Draggable
    const thisBlock = ref(null);
    let draggable = getDraggable();
    const blockStyle = draggable.blockStyle;
    const DataService = new Service().DataService;


    const props = defineProps({
        text: String,
    });


    const editableTextBlock = ref(null);
    const isEditing = ref(false);
    const editableText = ref(`${props.text}`);

    const onMouseLeave = () => {
        switch_contenteditable("false") // off span text editiong for close blue effect text draging
    };

    // Functions for dragging
    const startDragging = (event) => {

        if (isEditing.value) {
            draggable.stopDragging(); // Не начинаем перетаскивание, если режим редактирования включен
        }
    };

    // functions for work with text
    const enableEditing = () => {

        if (!DataService.isHaveSelectedBlock()) return; // Select this block if dont have selected block
        if (DataService.selected_block.value["block_dragging"] != 0) return;
        
        const editableSpan = editableTextBlock.value;
        switch_contenteditable("true")
        if (editableSpan) {
            editableSpan.focus();
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(editableSpan);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };


    function switch_contenteditable(value)
    {
        const editableSpan = editableTextBlock.value;

        if (editableSpan.contentEditable != value)
        {
            editableSpan.contentEditable = value;
        }

    }
    //

    // service functions
    onMounted(() => {
        draggable = startDraggable(draggable, thisBlock.value, true);
    });

    onBeforeUnmount(() => {
    });
    //


</script>

<style scoped>

.block {
    min-width: 100px;
    min-height: 100px;
    background: #257ccd;
    padding: 20px;
    margin: auto;
    border-radius: 10px;
    border: 1px solid #435b72;
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
    user-select: none;
}

</style>