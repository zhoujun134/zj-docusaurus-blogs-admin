<template>
  <div class="layout-container">
    <el-container class="el-layout-container">
      <el-header>
        <div class="toolbar">
          <el-dropdown>
            <el-icon class="el-icon-span">
              <setting/>
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>消息通知</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>个人中心</span>
        </div>
      </el-header>
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

</script>

<style scoped>

</style>
