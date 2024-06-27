<template>
  <div class="layout-container">
    <el-container class="el-layout-container is-vertical">
      <ZsHeader />
      <el-container>
        <ZsAside />
        <el-main style="padding: 20px">
          <el-scrollbar>
            <ArticleList />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import ZsAside from "@/components/ZsAside.vue";
import ArticleList from "@/components/ArticleList.vue";
import ZsHeader from "@/components/ZsHeader.vue";

</script>

<style scoped>

</style>
