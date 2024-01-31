<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from './store';
import { useRoute } from 'vue-router';

import NavBar from './components/NavBar.vue';

const route = useRoute()
const movieStore = useMovieStore()

const show = ref(false)


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
