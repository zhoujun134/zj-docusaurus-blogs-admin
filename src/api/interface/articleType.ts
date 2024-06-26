export interface IArticle {
    articleId: string,
    title: string,
    articleAbstract: string
    content: string,
    createTime?: string
    headerImageUrl?: string
    tagList?: ITag[]
    categoryList?: ICategory[]
    tocString?: string,
    path?:string,
    type?:string,
}

export interface ICategory {
    categoryId: string,
    name: string
}

export interface ITag {
    tagId: string,
    tagName: string
}

export interface ArticleListReq {
    pageNumber: number,
    pageSize: number,
    categoryId?: string,
    tagId?: string,
    keyword?: string,
}

export interface ArticleDetailReq {
    articleId: string
}

export interface ICommentInfo {
    commentId: string,
    author: string,
    content: string,
    createTime: string,
    likeNum?: number,
    children: ICommentInfo[],
    isShowSubmit?: boolean
}

export interface ICommentSubmitRequest {
    articleId?: string,
    parentCommentId?: string,
    replyCommentId?: string,
    author: string,
    email: string,
    content: string;
}

export interface ICommentLikeSubmitRequest {
    commentId: string
}
export interface IArchiveArticle {
    articleId: string,
    title: string,
    createTime: string,
    createTimeStr: string,
}
export interface ISearchReq {
    searchKey: string
}

export interface IArticleOperateReq {
    articleId: string,
    title: string,
    articleAbstract: string
    content: string,
    createTime?: string
    headerImageUrl?: string
    tagIdList?: string[]
    categoryIdList?: string[]
}

export interface IZjToken {
    tokenName: string
    tokenValue: string
    tokenTimeout: number
    sessionTimeout: number
    loginId: string
}

// 登录表单
export interface ILoginForm {
    username: string
    password: string
}
export interface IUserInfo {
//readonly id number
    id: number
    name: string
    username: string
    password: string
    email: string
    description: string
}
export interface IHomeInfo {
    login: boolean;
}

export interface IFriendInfo {
    title?: string;
    siteUrl?: string;
    logoUrl?: string;
    description?: string;
}
export interface IResult<T> {
    code: string
    message: string
    data?: T | any
}

export interface Page<T> {
    current: number,
    total: number,
    pageSize: number,
    records?: T[]
}


