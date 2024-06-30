<script setup lang="ts">
const onClickPublish = () => {
  window.location.href = "/article/publish";
}
const onClickArticleList = () => {
  window.location.href = "/article/list";
}
const onClickSiteConfig = () => {
  window.location.href = "/site/config";
}
</script>

<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu>
        <el-menu-item index="1-1" class="zs-el-menu-item" @click="onClickSiteConfig">
          站点配置
        </el-menu-item>
        <el-menu-item index="1-2" class="zs-el-menu-item" @click="onClickPublish">
          发布文章
        </el-menu-item>
        <el-menu-item index="1-3" class="zs-el-menu-item" @click="onClickArticleList">
          文章列表
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.zs-el-menu-item {
  display: flex;
  justify-content: center;
  text-decoration: none;
  border: #29784c solid 1px;
  border-radius: 0.25em;
}

.zs-el-menu-item > a {
  text-decoration: none;
}
</style>
