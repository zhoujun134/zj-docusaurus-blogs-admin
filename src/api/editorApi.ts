import request from "@/api/service";
import type {IArticle, IArticleOperateReq, ICategory, IResult, ITag} from "@/api/interface/articleType";

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
        console.log("获取文章列表出现错误啦！" + message)
        return {
            code: "-1",
            message: message
        }
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
        console.log("添加文章分类！" + message)
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
