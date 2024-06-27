<script setup lang="ts">

import {Setting} from "@element-plus/icons-vue";
</script>

<template>
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
</template>

<style scoped>

</style>
