<style scoped>
.Main_container {
  height: 100%;
}

.WorkSpace_container {
  height: 90%;
  display: flex;
  
}

</style>

<template>
  <div className="Main_container">
    <UpPanel/>
    <div className="WorkSpace_container">
      <LeftPanel/>
      <WorkSpace/>
    </div>
  </div>
</template>

<script setup>

import LeftPanel from "./components/LeftPanel.vue";
import UpPanel from "./components/UpHeader.vue";
import WorkSpace from "./components/MainWorkingSpace.vue";


</script>
