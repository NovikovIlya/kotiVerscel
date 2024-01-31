<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>


<template >
  <div class="hh">
    <NavBar />
    <RouterView  />
  </div>
</template>


<style >
@import './style.css';
.fix{
  overflow: hidden;
}
.hh{
  min-height: 100vh;
}
</style>
