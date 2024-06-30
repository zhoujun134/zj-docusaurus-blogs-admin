<script setup lang="ts">

import {Setting} from "@element-plus/icons-vue";
import Cookies from "js-cookie";
import {ref, watchEffect} from "vue";
import {logout} from "@/api/homeApi";
import {ElMessage} from "element-plus";

const isLogin = ref(false);

watchEffect(() => {
  let zsUserToken = Cookies.get("zsUserToken");
  if (zsUserToken) {
    isLogin.value = true;
  }
  isLogin.value = !!zsUserToken;
})

function homeLogout() {
  logout().then(res => {
    if (res.code == "0") {
      Cookies.remove("zsUserToken");
      window.location.href = "/";
    } else {
      ElMessage.error({
        message: "注销失败！请稍后重试！",
        duration: 5 * 1000
      })
    }
  })
}

</script>

<template>
  <el-header v-if="isLogin">
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
      <span @click="homeLogout"><a href="/">注销</a></span>
    </div>
  </el-header>
</template>

<style scoped>

</style>
