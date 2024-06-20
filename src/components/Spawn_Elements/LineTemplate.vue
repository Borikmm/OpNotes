<template>
    <div
      class="draggable_block"
      ref="thisBlock"
      :style="blockStyle"
    >
        <div class="line-container">
            <div
                class="line"
                :style="{ left: start.x + 'px', top: start.y + 'px', width: length + 'px', transform: `rotate(${angle}deg)` }"
            ></div>
            <div
                class="handle start"
                :style="{ left: start.x + 'px', top: start.y + 'px' }"
                @mousedown="startDraggingLine('start', $event)"
                @mouseup="stopDraggingLine()"
            ></div>
            <div
                class="handle end"
                :style="{ left: end.x + 'px', top: end.y + 'px' }"
                @mousedown="startDraggingLine('end', $event)"
                @mouseup="stopDraggingLine()"
            ></div>
        </div>
    </div>

</template>



<script setup>

import {getDraggable, startDraggable}  from '../../Scripts/Draggable/Draggable.js'; // Подключение класса Draggable
import { ref, reactive, computed, onMounted, onBeforeUnmount} from 'vue';

// for dragging

const thisBlock = ref(null);
let draggable = getDraggable();
const blockStyle = draggable.blockStyle;

// for Line
const line_dragging = ref(null);
const offset = reactive({ x: 0, y: 0 });
const start = reactive({ x: 100, y: 100 });
const end = reactive({ x: 300, y: 100 });


const getAngle = (start, end) => {
  return Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
};

const getLength = (start, end) => {
  return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
};

const angle = computed(() => getAngle(start, end));
const length = computed(() => getLength(start, end));


const startDraggingLine = (handle, event) => {
  draggable.stopDragging();
  line_dragging.value = handle;
  offset.x = event.clientX - (handle === 'start' ? start.x : end.x);
  offset.y = event.clientY - (handle === 'start' ? start.y : end.y);
  window.addEventListener('mousemove', handleMouseMove);
};


const stopDraggingLine = () => {
    line_dragging.value = null;
    window.removeEventListener('mousemove', handleMouseMove);
}


const handleMouseMove = (event) => {
  if (!line_dragging.value) return;

  if (line_dragging.value === 'start') {
    start.x = event.clientX - offset.x;
    start.y = event.clientY - offset.y;
  } else if (line_dragging.value === 'end') {
    end.x = event.clientX - offset.x;
    end.y = event.clientY - offset.y;
  }
};
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

.line-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.line {
  position: absolute;
  height: 2px;
  background-color: black;
  transform-origin: left center;
}

.handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

</style>
