<script setup lang="ts">
import { useRouter } from 'vue-router';

//data
const router = useRouter();

//methods
const goBack = () => {
  router.push('/');
};
</script>

<template>
  <el-col :sm="12" :lg="6">
    <el-result icon="error" title="Ошибка 404" sub-title="">
      <template #extra>
        <el-button @click="goBack" type="primary">Назад</el-button>
      </template>
    </el-result>
  </el-col>
</template>

<style scoped>
.el-col-sm-12 {
  width: 100%;
  max-width: 100%;
}
</style>
