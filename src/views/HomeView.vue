<template>
  <div class="layout-container">
    <el-container class="el-layout-container is-vertical">
      <ZsHeader />
      <el-container>
        <ZsAside />
        <el-main style="padding: 20px">
          <el-scrollbar>
            <ArticleEditorForm/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import ArticleEditorForm from "@/components/ArticleEditorForm.vue";
import ZsAside from "@/components/ZsAside.vue";
import {Setting} from "@element-plus/icons-vue";
import ZsHeader from "@/components/ZsHeader.vue";

</script>

<style scoped>

</style>
