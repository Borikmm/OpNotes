<template>
    <div
      class="Block"
      @pointerdown="startDragging"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @mousemove="onMouseMove"
      :style="blockStyle"
      ref="block"
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


import { ref, inject, reactive, computed, onMounted, onBeforeUnmount} from 'vue';

const Left_panel_width = inject('Left_panel_width').value;
const Up_panel_height = inject('Up_panel_height').value;

const BLOCK_STYLE_VALUES = {
        "blockIsDragingColor": "#D33131"
}

const position = reactive({ x: 0, y: 0 });
const offset = reactive({ x: 0, y: 0 });
const boxShadow = ref('none');
const isDragging = ref(false);
const dragging = ref(null);

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
//



    // Functions for dragging
const startDragging = (event) => {

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


// for line

const startDraggingLine = (handle, event) => {
  stopDragging();
  dragging.value = handle;
  offset.x = event.clientX - (handle === 'start' ? start.x : end.x);
  offset.y = event.clientY - (handle === 'start' ? start.y : end.y);
};


const stopDraggingLine = () => {
    dragging.value = null;
}


const handleMouseMove = (event) => {
  if (!dragging.value) return;

  if (dragging.value === 'start') {
    start.x = event.clientX - offset.x;
    start.y = event.clientY - offset.y;
  } else if (dragging.value === 'end') {
    end.x = event.clientX - offset.x;
    end.y = event.clientY - offset.y;
  }
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
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerup', stopDragging);
});

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', stopDragging);
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

.handle.start {
  z-index: 1000;
}

.handle.end {
  z-index: 1000;
}



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
}

.LineBlockDiv {
    width: 100px;
    height: 100px;
    background-color: aqua;
}

</style>