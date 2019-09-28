/**
 * http配置
 */
import axios from 'axios'
import { notification  } from 'antd'
// axios 配置
axios.defaults.timeout = 20000;
// axios.defaults.baseURL = BaseParam.fetchUrl;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // token 失效
        if (response.data.code === 20103) {
            sessionStorage.removeItem("token");
            window.location.hash = '/login'
        }
        // 登录失效
        return response;
    },
    error => {
        console.log('error',error);
        if (error === undefined || error.code === 'ECONNABORTED') {
            notification.error({
                message: '服务请求超时!',
                description: '请稍后刷新重试!',
            });
            return Promise.reject(error)
        }
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    // store.commit(types.LOGOUT);
                    // router.replace({
                    //     path: 'login',
                    //     query: {redirect: router.currentRoute.fullPath}
                    // })
                    break;
                case 400:
                    notification.error({
                        message: error.response.data,
                        description: `状态码:400, 状态信息:${error.response.statusText}`
                    });
                    break;
                case 500:
                    notification.error({
                        message: '服务器出错!',
                        description: `状态码:500, 状态信息:${error.response.statusText}`,
                    });
                    break;
                case 502:
                    notification.error({
                        message: '网关错误!',
                        description: `状态码:502, 状态信息:${error.response.statusText}`
                    });
                    break;
                default:
                    break;
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;