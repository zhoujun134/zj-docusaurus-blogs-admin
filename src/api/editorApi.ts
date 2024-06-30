import request from "@/api/service";
import type {
    IArticle,
    IArticleOperateReq,
    ICategory,
    IDocusaurusConfig,
    IResult,
    ITag
} from "@/api/interface/articleType";
import {ElMessage} from "element-plus";

export async function uploadFile(data: object) {
    return await request({
        url: '/api/admin/file/upload',
        method: 'post',
        data: data,
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<string>;
    }).catch(error => {
        let {message} = error
        console.log("上传出现错误啦！" + message)
        return {
            code: "-1",
            message: message,
            data: ""
        }
    })
}


export async function publishArticle(data: IArticleOperateReq) {
    return await request({
        url: '/api/admin/zs/article/add',
        method: 'post',
        data: data,
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<IArticle>;
    }).catch(error => {
        let {message} = error
        console.error("发布文章异常！" + message)
        ElMessage.error({
            message: "发布文章异常, " + message,
            duration: 5 * 1000
        })
        return {
            code: "-1",
            message: message
        }
    })
}
export async function addDocusaurusConfig(data: IDocusaurusConfig) {
    return await request({
        url: '/api/admin/zs/article/docusaurus/config/add',
        method: 'post',
        data: data,
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<boolean>;
    }).catch(error => {
        let {message} = error
        console.error("添加站点配置异常！" + message)
        ElMessage.error({
            message: "添加站点配置异常, " + message,
            duration: 5 * 1000
        })
        return {
            code: "-1",
            message: message
        }
    })
}
export async function queryDocusaurusConfig() {
    return await request({
        url: '/api/admin/zs/article/docusaurus/config/query',
        method: 'get'
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<IDocusaurusConfig>;
    }).catch(error => {
        let {message} = error
        console.error("获取站点配置异常！" + message)
        ElMessage.error({
            message: "获取站点配置异常, " + message,
            duration: 5 * 1000
        })
        return {
            code: "-1",
            message: message
        } as IResult<IDocusaurusConfig>
    })
}

export async function addArticleCategory(data: ICategory[]) {
    return await request({
        url: '/api/admin/zs/article/category/add',
        method: 'post',
        data: data,
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<boolean>;
    }).catch(error => {
        let {message} = error
        console.error("添加文章分类异常！" + message)
        ElMessage.error({
            message: "添加文章分类异常, " + message,
            duration: 5 * 1000
        })
        return {
            code: "-1",
            message: message
        }
    })
}

export async function addArticleTag(data: ITag[]) {
    return await request({
        url: '/api/admin/zs/article/tag/add',
        method: 'post',
        data: data,
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<boolean>;
    }).catch(error => {
        let {message} = error
        console.log("添加文章标签！" + message)
        return {
            code: "-1",
            message: message
        }
    })
}
