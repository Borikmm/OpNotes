<template>
    <div
      class="block"
      @pointerdown="startDragging"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousemove="onMouseMove"
      @dblclick="enableEditing"
      :style="blockStyle"
      ref="this_block"
    >
        <span contenteditable="false" class="input_block" ref="editableTextBlock">{{ editableText }}</span>
        <!-- <p @dblclick="enableEditing" v-if="!isEditing" class="input_block">{{ editableText }}</p>
        <input v-else v-model="editableText" @blur="saveText" @keyup.enter="saveText" class="input_block"/> -->
    </div>
</template>



<script setup>


    const BLOCK_STYLE_VALUES = {
        "blockIsDragingColor": "#D33131"
    }


    import { ref, inject, reactive, computed, onMounted, onBeforeUnmount} from 'vue';

    const Left_panel_width = inject('Left_panel_width').value;
    const Up_panel_height = inject('Up_panel_height').value;
    let Selected_block = inject('Old_selected_block').value;


    const props = defineProps({
        text: String,
    });

    const position = reactive({ x: 0, y: 0 });
    const offset = reactive({ x: 0, y: 0 });
    const boxShadow = ref('none');
    const isDragging = ref(false);
    const this_block = ref(null);


    const editableTextBlock = ref(null);

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
        switch_contenteditable("false") // off span text editiong for close blue effect text draging
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
        change_selected_block_z_index()
        
        this_block.value.style.zIndex = 20; // for set main layer on window

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


    function change_selected_block_z_index()
    {
        
        console.log(Selected_block);
        if (Selected_block != 0)
        {
            Selected_block.value.style.zIndex = 10;
        }
        
        this_block.value.style.zIndex = 20;
        Selected_block = this_block;
    }

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
    min-width: 100px;
    min-height: 100px;
    background: #257ccd;
    padding: 20px;
    margin: auto;
    border-radius: 10px;

    border: 1px solid #435b72;
    display: inline;

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