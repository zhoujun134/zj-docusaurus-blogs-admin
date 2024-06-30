import request from "./service";

import {ElMessage} from "element-plus";
import type {IFriendInfo, IHomeInfo, ILoginForm, IResult, IZjToken} from "@/api/interface/articleType";

export function homeIndex() {
    return request({
        url: '/api/index',
        method: 'get'
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<IHomeInfo>;
    }).catch(error => {
        let {message} = error;
        ElMessage.error({
            message: "系统开小差了！请稍后重试！" + message,
            duration: 5 * 1000
        })
        return {
            code: 500,
            message: "系统开小差了！请稍后重试！" + message,
            data: {login: false}
        }
    })
}

export function homeFriends() {
    return request({
        url: '/api/friends',
        method: 'get'
    }).then(resp => {
        return JSON.parse(JSON.stringify(resp)) as IResult<Map<string, IFriendInfo[]>>;
    }).catch(error => {
        let {message} = error;
        ElMessage.error({
            message: "系统开小差了！请稍后重试！" + message,
            duration: 5 * 1000
        })
        return {
            code: 500,
            message: "系统开小差了！请稍后重试！" + message,
            data: {} as Map<string, IFriendInfo[]>
        }
    })
}

export function register(data: any) {
    return request({
        url: '/api/register/',
        method: 'post',
        data: data,
    }).then(res => {
        const registerResult = res.data as IResult<boolean>
        console.log("注册成功！res =" + JSON.stringify(res.data))
        if (registerResult.data) {

        }
    }).catch(error => {

    })
}

export async function logout() {
    return await request.get("/api/logout/")
        .then(resp => {
            return JSON.parse(JSON.stringify(resp)) as IResult<boolean>;
        }).catch(error => {
            const res: IResult<boolean> = {
                code: "-1",
                message: "系统开小差了！请稍后重试!"
            }
            return res;
        })
}

export async function login(data: ILoginForm): Promise<IResult<IZjToken>> {
    return await request.post<IResult<IZjToken>>("/api/login/", data)
        .then(resp => {
            const result: IResult<IZjToken> = JSON.parse(JSON.stringify(resp)) as IResult<IZjToken>
            console.log("result: " + JSON.stringify(result))
            console.log("333333  result.data= " + JSON.stringify(result.data))
            console.log("登录之后的 token: " + result.data.tokenName + " ===> " + result.data.tokenValue)
            localStorage.setItem(result.data.tokenName, JSON.stringify(result))
            return result;
        }).catch(error => {
            const res: IZjToken = {
                tokenName: "",
                tokenValue: "",
                tokenTimeout: 0,
                sessionTimeout: 0,
                loginId: ""
            };
            let {message} = error;
            console.log("调用登录接口 出现异常啦！message=" + message)
            return {
                code: "-1",
                message: message,
                data: res
            } as IResult<IZjToken>
        });
}

