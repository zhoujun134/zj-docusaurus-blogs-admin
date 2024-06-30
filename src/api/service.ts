import {ElLoading, ElMessage} from 'element-plus';
import {errorCodeType} from "@/api/utils/error-code-type";
import type {IResult} from "@/api/interface/articleType";
import axios from "axios";
import zsBlogConfig from "../../zs-blog-config";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
// 创建axios实例
const service = axios.create({
    // 服务接口请求
    // baseURL: "import.meta.env.VITE_APP_BASE_API",
    baseURL: zsBlogConfig.apiConfig.baseUrl,
    // 超时设置
    timeout: zsBlogConfig.apiConfig.timeout,
    headers: zsBlogConfig.apiConfig.headers,
    withCredentials: true,
})

let loading: any;
//正在请求的数量
let requestCount: number = 0
//显示loading
const showLoading = () => {
    if (requestCount === 0 && !loading) {
        loading = ElLoading.service({
            text: "拼命加载中，请稍后...",
            background: 'rgba(0, 0, 0, 0.7)',
            spinner: 'el-icon-loading',
        })
    }
    requestCount++;
}
//隐藏loading
const hideLoading = () => {
    requestCount--
    if (requestCount == 0) {
        loading.close()
    }
}
// 请求拦截
service.interceptors.request.use(config => {
    showLoading()
    // 是否需要设置 token
    // config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            let part = encodeURIComponent(propName) + "=";
            if (value !== null && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        url += subPart + encodeURIComponent(value[key]) + "&";
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    return config
}, error => {
    Promise.reject(error)
        .then(res =>
            console.log("request: res:", res))
})

// 响应拦截器
service.interceptors.response.use((res) => {
        hideLoading()
        if (res.status == 401) {
            ElMessage.error({
                message: "登录失效，请重新登录!",
                duration: 5 * 1000
            })
            window.location.href = "/"
        }
        // console.log("response deal " + JSON.stringify(res.data))
        const result: IResult<object> = res.data as IResult<object>;
        console.log("result: ", result)
        // 未设置状态码则默认成功状态
        const code = result.code;
        // 获取错误信息
        let msg = ""
        if (code != "0") {
            msg = result.message || errorCodeType(code) || errorCodeType('default')
        } else {
            msg = result.message
        }
        if (code === "0") {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res.data)
        }
    },
    error => {
        console.error('err', error)
        hideLoading()
        let {message} = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            let statusCode = message.substr(message.length - 3)
            if (statusCode == "401") {
                Cookies.remove("zsUserToken");
                ElMessage.error({
                    message: "登录失效，请重新登录!",
                    duration: 5 * 1000
                })
                window.location.href = '/'
            }
            message = "系统接口" + statusCode + "异常";
        }
        const errorResult: IResult<object> = {
            code: "-1",
            message: message,
            data: ""
        }
        return Promise.reject(errorResult)
    }
)
export default service;
