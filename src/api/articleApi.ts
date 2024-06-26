import request from "@/api/service";

import {ElMessage} from "element-plus";
import type {
    ArticleDetailReq,
    ArticleListReq, IArchiveArticle,
    IArticle,
    ICategory, ICommentInfo, ICommentLikeSubmitRequest, ICommentSubmitRequest,
    IResult,
    ISearchReq, ITag,
    Page
} from "@/api/interface/articleType";

export async function getArticleList(reqDto: ArticleListReq): Promise<IResult<Page<IArticle>>> {

    return await request({
        url: '/api/article/list',
        method: 'post',
        data: reqDto,
    }).then(resp => {
        // console.log("获取到的结果为: result= " + JSON.stringify(result))
        return JSON.parse(JSON.stringify(resp)) as IResult<Page<IArticle>>;
    }).catch(error => {
        let {message} = error
        console.log("获取文章列表出现错误啦！" + message)
        return getDefaultPageListIArticle(message)
    })
}

// 获取文章详情页
export async function getArticleDetail(reqDto: ArticleDetailReq): Promise<IResult<IArticle>> {
    return await request({
        url: '/api/article/detail',
        method: 'post',
        data: reqDto,
    }).then(resp => {
        // console.log("获取到的结果为: result= " + JSON.stringify(result))
        return JSON.parse(JSON.stringify(resp)) as IResult<IArticle>;
    }).catch(error => {
        let {message} = error
        console.log("获取文章列表出现错误啦！" + message)
        return getDefaultPageDetailIArticle(message)
    })
}


export async function getCategoryList(data: ISearchReq) {
    return await request({
        url: '/api/category/list',
        method: 'post',
        data: data,
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<ICategory[]>;
    }).catch(error => {
        let {message} = error
        console.log("获取文章列表出现错误啦！" + message)
        return {
            code: "-1",
            message: message,
            data: [] as ICategory[]
        }
    })
}

export async function getTagList(data: ISearchReq) {
    return await request({
        url: '/api/tag/list',
        method: 'post',
        data: data,
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<ITag[]>;
    }).catch(error => {
        let {message} = error
        console.log("获取文章列表出现错误啦！" + message)
        return {
            code: "-1",
            message: message,
            data: [] as ITag[]
        }
    })
}

export async function getCommentListByArticleId(articleId: string) {
    return await request({
        url: '/api/article/comment',
        method: 'get',
        params: {
            articleId: articleId
        }
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<ICommentInfo[]>;
    }).catch(error => {
        let {message} = error;
        ElMessage.error({
            message: "系统开小差了！请稍后重试！" + message,
            duration: 5 * 1000
        })
        const result: IResult<ICommentInfo[]> = {
            code: "-1",
            message: "系统开小差了！请稍后重试！" + message,
            data: [] as ICommentInfo[]
        };
        return result;
    })
}

export async function submitComment(data: ICommentSubmitRequest) {
    return await request({
        url: '/api/article/comment/submit',
        method: 'post',
        data: data
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<boolean>;
    }).catch(error => {
        let {message} = error;
        ElMessage.error({
            message: "系统开小差了！请稍后重试！" + message,
            duration: 5 * 1000
        })
        const result: IResult<ICommentInfo[]> = {
            code: "-1",
            message: "系统开小差了！请稍后重试！" + message,
            data: false
        };
        return result;
    })
}


export async function submitLikeComment(commentId: string) {
    return await request({
        url: '/api/article/comment/like',
        method: 'post',
        data: {
            commentId: commentId
        } as ICommentLikeSubmitRequest
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<boolean>;
    }).catch(error => {
        let {message} = error;
        ElMessage.error({
            message: "系统开小差了！请稍后重试！" + message,
            duration: 5 * 1000
        })
        const result: IResult<ICommentInfo[]> = {
            code: "-1",
            message: "系统开小差了！请稍后重试！" + message,
            data: false
        };
        return result;
    })
}

export async function getArchiveMap() {
    return await request({
        url: '/api/article/archivist',
        method: 'get',
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<IArchiveArticle[]>;
    }).catch(error => {
        let {message} = error;
        ElMessage.error({
            message: "系统开小差了！请稍后重试！" + message,
            duration: 5 * 1000
        })
        const result: IResult<IArchiveArticle[]> = {
            code: "-1",
            message: "系统开小差了！请稍后重试！" + message,
            data: [] as IArchiveArticle[]
        };
        return result;
    })
}

export function getDefaultPageListIArticle(message: string): IResult<Page<IArticle>> {
    const defaultPage: Page<IArticle> = {
        current: 1,
        total: 0
    } as Page<IArticle>;
    return {
        code: "0",
        message: message,
        data: defaultPage
    }
}

export function getDefaultPageDetailIArticle(message: string): IResult<IArticle> {
    const defaultIArticle: IArticle = {
        articleId: "",
        title: "",
        articleAbstract: "",
        content: "",
        createTime: ""
    }
    return {
        code: "0",
        message: message,
        data: defaultIArticle
    }
}
