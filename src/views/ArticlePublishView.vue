<template>
  <div class="layout-container">
    <el-container class="el-layout-container is-vertical">
      <ZsHeader />
      <el-container>
        <ZsAside />
        <el-main style="">
          <el-scrollbar class="zj-editor-form-scrollbar">
            <ArticleEditorForm />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import ZsAside from "@/components/ZsAside.vue";
import {Setting} from "@element-plus/icons-vue";
import ArticleList from "@/components/ArticleList.vue";
import ArticleEditorForm from "@/components/ArticleEditorForm.vue";
import ZsHeader from "@/components/ZsHeader.vue";

</script>

<style scoped>
.zj-editor-form-scrollbar {
  height: calc(100vh - 80px);
  padding: 20px
}
</style>
