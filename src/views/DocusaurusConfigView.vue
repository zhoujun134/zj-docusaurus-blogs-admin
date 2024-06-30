<script setup lang="ts">

import ZsAside from "@/components/ZsAside.vue";
import ZsHeader from "@/components/ZsHeader.vue";
import DocusaurusConfig from "@/components/DocusaurusConfig.vue";
</script>

<template>
  <div class="layout-container">
    <el-container class="el-layout-container is-vertical">
      <ZsHeader />
      <el-container>
        <ZsAside />
        <el-main>
          <DocusaurusConfig />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
