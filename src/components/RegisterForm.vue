<script setup lang="ts">

import {ref} from "vue";
import {register} from "@/api/homeApi";

const registerForm = ref({
  name: "",
  username: "",
  password: "",
  email: "",
  description: ""
});

function handleRegister() {
  console.log("registerForm before: = " + JSON.stringify(registerForm.value))
  const res = register(registerForm.value)
  console.log("handleRegister 注册结果为: " + JSON.stringify(res))
}

</script>

<template>
  <div class="zj-blog-register-container">

    <el-form :model="registerForm"
             label-width="auto"
             class="zj-el-form"
    >
      <div class="zj-blog-register-form-item">
        <el-text>
          <h1>欢迎前辈回家，快来注册吧！</h1>
        </el-text>
      </div>
      <div class="zj-blog-register-form-item">
        <el-form-item label="用户名称">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="zj-blog-register-form-item">
        <el-form-item label="用户名">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
      </div>
      <div class="zj-blog-register-form-item">
        <el-form-item label="邮箱">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
      </div>
      <div class="zj-blog-register-form-item">
        <el-form-item label="描述">
          <el-input v-model="registerForm.description"></el-input>
        </el-form-item>
      </div>
      <div class="zj-blog-register-form-item">
        <el-form-item label="密码">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
      </div>
      <div class="zj-blog-register-form-item">
        <el-form-item label="  ">
          <el-button type="primary" @click="handleRegister()">注册</el-button>
          <el-button type="primary">
            <router-link to="/login" style="color: white">登录</router-link>
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>

  <el-card class="zj-blog-footer">
    <p>© 2024- zbusTop-Z不殊</p>
    <p>京ICP备2023022073号-1</p>
    <p>京公网安备11010802044104号</p>
  </el-card>
</template>

<style scoped>

.zj-blog-register-container {
  display: flex;
  height: 80vh;
  margin-top: 2%;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  background: url("/bg-xinxin.gif") repeat top left;
  animation: twinkling 40s infinite alternate linear;
}

.zj-blog-register-form-item {
  width: 100%;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */

  .el-form-item {
    width: 100%;
    min-width: 400px;
  }
}


</style>
