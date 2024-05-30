<template>
    <div
      class="block"
      @pointerdown="startDragging"
      :style="blockStyle"
      ref="block"
    >
      <p>{{ text }}</p>
    </div>
  </template>
  
<script setup>

    import { ref, inject, reactive, computed, onMounted, onBeforeUnmount } from 'vue';

    const Left_panel_width = inject('Left_panel_width').value;
    const Up_panel_height = inject('Up_panel_height').value;


    const props = defineProps({
        text: String,
    });

    const position = reactive({ x: 0, y: 0 });
    const offset = reactive({ x: 0, y: 0 });
    const isDragging = ref(false);




    const blockStyle = computed(() => ({
        transform: `translate(${position.x}px, ${position.y}px)`,   
    }));

    let animationFrame;

    const startDragging = (event) => {
        const blockRect = event.currentTarget.getBoundingClientRect();
        offset.x = event.clientX - blockRect.left;
        offset.y = event.clientY - blockRect.top;
        isDragging.value = true;

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', stopDragging);
    };

    const onPointerMove = (event) => {
        if (isDragging.value) {

            console.log(Left_panel_width);
            console.log(Up_panel_height);

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
    };

    onMounted(() => {
        window.addEventListener('pointerup', stopDragging);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', stopDragging);
    });
</script>


<!-- <template>

    import { ref, inject, reactive, computed, onMounted, onBeforeUnmount } from 'vue';

    const Left_panel_width = inject('Left_panel_width').value;
    const Up_panel_height = inject('Up_panel_height').value;

                position.x = event.clientX - offset.x - Left_panel_width;
            position.y = event.clientY - offset.y - Up_panel_height;


    <div class="block" data-dragable="false"
    @mouseleave="stopDragging($event)"
    @mousedown="startDragging($event)"
    @mousemove="dragBlock($event)"
    @mouseup="stopDragging($event)"
    ref="block"
    >
       <span>{{ text }}</span>
    </div>
</template>

<script setup>

// @click="start_dragabble($event)"
//    
 
    import { ref } from 'vue'

    const props = defineProps({
        text: Object
    })

    let animationFrame;

    function start_dragabble(element)
    {
        const this_element = element.currentTarget;

        this_element.style.backgroundColor = "red";
        this_element.style.top = "100px";
        this_element.style.left = "100px";
        this_element.style.position = "absolute";

    }

    const offsetX = ref(0);
    const offsetY = ref(0);

    const startDragging = (event) => {

        const block =  event.currentTarget;
        var dragableValue = block.dataset.dragable;

        if (dragableValue == "false")
        {

            console.log("start dragging...");
         
            const rect = block.getBoundingClientRect();
            console.log("rectX: " + rect.left);
            console.log("rectY: " + rect.top);

            offsetX.value = event.clientX - rect.left;
            offsetY.value = event.clientY - rect.top;

            
            block.dataset.dragable = "true";
        }
    };

    function stopDragging(event)
    {
        const block =  event.currentTarget;
        var dragableValue = block.dataset.dragable;

        if (dragableValue == "true")
        {
            block.dataset.dragable = "false";
        }
        cancelAnimationFrame(animationFrame);
    }

    

    const dragBlock = (event) => {

        var block =  event.currentTarget;
        var dragableValue = block.dataset.dragable;

        if (dragableValue == "true")
        {


            console.log("dragging...");
            console.log("clientX: " + event.clientX);
            console.log("clientY: " + event.clientY);
            console.log("offsetX.value: " + offsetX.value);
            console.log("offsetY.value: " + offsetY.value);

            block.style.left = (event.clientX - offsetX.value) + "px";
            block.style.top = (event.clientY - offsetY.value) + "px";


            //animationFrame = requestAnimationFrame(dragBlock);
            // block.style.position = "absolute";
            // block.style.left = "145px";
            // block.style.top = "10px";
        }
    };


</script> -->

<style scoped>

.block {
    position: fixed;
    cursor: grab;
    width: 100px;
    height: 100px;
    background: #3085d6;
    padding: 20px;
    margin: auto;
    border-radius: 5px;
    transition: 0.5s;
    user-select: none;
}

.block:hover {
    box-shadow: 0 5px 25px #cb31ff;
}

.block:active{
    cursor: grabbing;
}

</style>