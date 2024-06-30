<script setup lang="ts">
import {reactive, watchEffect} from "vue";
import type {IDocusaurusConfig} from "@/api/interface/articleType";
import {addDocusaurusConfig, queryDocusaurusConfig} from "@/api/editorApi";

const docusaurusConfig = reactive({
  docusaurusProjectPath: "",
  buildHistoryPath: "",
  nginxSitePath: ""
} as IDocusaurusConfig);

const rules = reactive({
  docusaurusProjectPath: [
    {required: true, message: '请输入 docusaurus 的运行项目路径', trigger: 'blur'}
  ],
  buildHistoryPath: [
    {required: true, message: '请输入 docusaurus 的运行备份项目路径', trigger: 'blur'}
  ],
  nginxSitePath: [
    {required: true, message: '请输入 docusaurus 的发布项目的 nginx 站点路径', trigger: 'blur'}
  ]
})

function saveOrUpdateConfig() {
  addDocusaurusConfig(docusaurusConfig).then(res => {
    console.log("##saveOrUpdateConfig addDocusaurusConfig res: ", res)
  })
}

function getDefaultDocusaurusConfig() {
  queryDocusaurusConfig().then(res => {
    if (res.code == '0') {
      const resConfig = res.data as IDocusaurusConfig
      docusaurusConfig.docusaurusProjectPath = resConfig.docusaurusProjectPath
      docusaurusConfig.buildHistoryPath = resConfig.buildHistoryPath
      docusaurusConfig.nginxSitePath = resConfig.nginxSitePath
    }
  })
}

watchEffect(() => {
  getDefaultDocusaurusConfig()
})

getDefaultDocusaurusConfig()

const goBack = () => {
  history.back()
}

</script>

<template>
  <div class="zj-editor-container">
    <el-form
        :model="docusaurusConfig"
        :rules="rules"
        label-position="right"
        label-width="auto"
        class="zj-el-form">
      <div class="zj-el-form-item">
        <el-form-item label="docusaurus 的运行项目路径" prop="docusaurusProjectPath">
          <el-input type="text" v-model="docusaurusConfig.docusaurusProjectPath"/>
        </el-form-item>
      </div>
      <div class="zj-el-form-item">
        <el-form-item label="docusaurus 的站点备份路径" prop="buildHistoryPath">
          <el-input type="text" v-model="docusaurusConfig.buildHistoryPath"/>
        </el-form-item>
      </div>
      <div class="zj-el-form-item">
        <el-form-item label="docusaurus 的 nginx 发布路径" prop="nginxSitePath">
          <el-input type="text" v-model="docusaurusConfig.nginxSitePath"/>
        </el-form-item>
      </div>
      <div class="zj-el-form-item-submit">
        <div class="zj-el-form-item-submit-button">
          <el-form-item label=" ">
            <el-button type="primary" @click="saveOrUpdateConfig()">发布</el-button>
            <el-button type="primary" @click="goBack">返回首页</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>

</style>
