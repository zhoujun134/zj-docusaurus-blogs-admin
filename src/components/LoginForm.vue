<template>
  <div class="zj-blog-login-container">
    <el-form
        label-width="auto"
        :model="form"
        style="max-width: 600px"
    >
      <div class="zj-blog-login-form-item">
        <el-text>
          <h1>欢迎前辈回家，快登入解锁更多功能吧！</h1>
        </el-text>
      </div>
      <el-form-item label="用户名">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" :show-password="true"/>
      </el-form-item>
      <el-form-item label="       ">
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button type="primary">
          <router-link to="/register" style="color: white">注册</router-link>
        </el-button>
      </el-form-item>
    </el-form>
    <el-card v-if="loginForm.loginId">
      <p>loginId: {{ loginForm.loginId }}</p>
      <p>tokenName: {{ loginForm.tokenName }}</p>
      <p>tokenValue: {{ loginForm.tokenValue }}</p>
      <el-link href="/web">回到首页</el-link>
    </el-card>
  </div>

  <el-card class="zj-blog-footer">
    <p>© 2024- zbusTop-Z不殊</p>
    <p>京ICP备2023022073号-1</p>
    <p>京公网安备11010802044104号</p>
  </el-card>

</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {login} from "@/api/homeApi";
import {ElMessage} from "element-plus";
import type {ILoginForm, IZjToken} from "@/api/interface/articleType";
import {useRouter} from "vue-router";
import {useUserStore} from "@/router/userStore";
import VueCookies from "vue-cookies";
import Cookies from "js-cookie";

let userToken: IZjToken = reactive({
  tokenName: "",
  tokenValue: "",
  tokenTimeout: 0,
  sessionTimeout: 0,
  loginId: ""
})

const loginForm = ref({
  tokenName: "",
  tokenValue: "",
  tokenTimeout: 0,
  sessionTimeout: 0,
  loginId: ""
} as IZjToken);

const form: ILoginForm = reactive({
  username: "",
  password: ""
})

const userRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: ["change", "blur"]
    },
    {
      pattern: /^[a-zA-Z][a-zA-Z0-9-]{3,31}$/,
      message: "用户名由英文字母开头的长度4-32位字母、_和-组成",
      trigger: ["change", "blur"],
    }
  ],
  password: {
    required: true,
    message: "请输入至少8个字符的密码",
    min: 8,
    trigger: ["change", "blur"]
  }
})

const userStore = useUserStore();
const router = useRouter();

function handleLogin() {
  login(form).then(result => {
    if (result.code != "0") {
      const message = result.message ? result.message : "登录失败，请联系管理员处理！";
      // 弹出错误信息
      ElMessage.error({
        message: message,
        duration: 5 * 1000
      })
      return;
    }
    const zjToken: IZjToken = result.data
    // 更新变量值
    if (zjToken.tokenValue && zjToken.tokenName) {
      loginForm.value = zjToken
    }
    // 更新 token 信息
    const tokenValue = localStorage.getItem("zsUserToken")
    if (tokenValue) {
      localStorage.setItem("zsUserToken", loginForm.value.tokenValue)
      Cookies.set("zsUserToken", loginForm.value.tokenValue, {
        expires: 7 * 24 * 60 * 60
      })
    }
    // 假设登录逻辑在这里，然后调用 userStore 的 login 方法
    userStore.login();
    router.push('/'); // 重定向到仪表板页面
  }).catch(error => {
    console.log("登录遇到异常了！" + error)
    let {message} = error
    ElMessage.error({
      message: message,
      duration: 5 * 1000
    })
  });
}


</script>


<style scoped>

.zj-blog-login-container {
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  margin-top: 2%;
  background: url("/bg-xinxin.gif") repeat top left;
  animation: twinkling 40s infinite alternate linear;
}

.zj-blog-login-form-item {
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
