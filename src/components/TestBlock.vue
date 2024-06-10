<template>
    <div
      class="draggable_block"
      ref="thisBlock"
      :style="blockStyle"
    >
        <div class="test_block"></div>
    </div>
</template>

<script setup>
  import {getDraggable, startDraggable}  from '../Scripts/Draggable/Draggable.js'; // Подключение класса Draggable
  

  // Draggable
  import { ref, onMounted} from 'vue';
  const thisBlock = ref(null);
  let draggable = getDraggable();
  const blockStyle = draggable.blockStyle;

  // this function worked after other code, in the end script init
  onMounted(() => {
    draggable = startDraggable(draggable, thisBlock.value, true);
  });

  

</script>


<style scoped>

.test_block {
    width: 100px;
    height: 100px;
    background-color: lightblue;
}

</style>
