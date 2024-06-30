<script setup lang="ts">

import ZsHeader from "@/components/ZsHeader.vue";
import RegisterForm from "@/components/RegisterForm.vue";
</script>

<template>
  <div class="layout-container">
    <el-container class="el-layout-container is-vertical">
      <ZsHeader />
      <el-container>
<!--        <ZsAside />-->
        <el-main style="padding: 20px">
          <register-form />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
