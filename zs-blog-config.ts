// 基础配置文件 zs-blog-config.ts
const zsBlogConfig = {
    siteTitle: "zj-docusaurus 管理系统",
    apiConfig: {
        // 接口请求的baseUrl
        baseUrl: "http://localhost:8080/zs",
        // 接口的超时时间设置
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Origin': '*'
        }
    }
}
export default zsBlogConfig;
