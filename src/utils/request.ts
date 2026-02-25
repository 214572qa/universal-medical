/**
 * Axios 二次封装
 * 功能：
 * 1. 请求拦截器：携带token等公共参数
 * 2. 响应拦截器：统一处理响应数据和错误
 * 3. HTTP错误码统一处理
 */
import { ElMessage } from 'element-plus';
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { HttpErrorConfigs } from '@/api/types/common';
import { HttpStatus } from '@/utils/enums/httpEnum';
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user';
import router from '@/router';

interface ErrorResponse {
    message?: string;
    code?: number;
    data?: any;
}

// HTTP错误码配置表
const HTTP_ERROR_CONFIGS: HttpErrorConfigs = {
    [HttpStatus.BAD_REQUEST]: { message: '请求参数错误' },
    [HttpStatus.UNAUTHORIZED]: { 
        message: 'Token过期，请重新登录',
        action: () => {
            // 清除用户信息并跳转登录
            const userStore = useUserStore();
            userStore.logout();
            userStore.visible = true;
            router.push('/home');
        }
    },
    [HttpStatus.FORBIDDEN]: { message: '拒绝访问，权限不足' },
    [HttpStatus.NOT_FOUND]: { message: '请求的资源不存在' },
    [HttpStatus.REQUEST_TIMEOUT]: { message: '请求超时' },
    [HttpStatus.INTERNAL_SERVER_ERROR]: { message: '服务器内部错误' },
    [HttpStatus.BAD_GATEWAY]: { message: '网关错误' },
    [HttpStatus.SERVICE_UNAVAILABLE]: { message: '服务不可用' },
    [HttpStatus.GATEWAY_TIMEOUT]: { message: '网关超时' },
};

/**
 * 统一错误处理函数
 * @param error Axios错误对象
 * @returns 格式化后的错误信息
 */
const handleHttpError = (error: AxiosError): string => {
    const status = error.response?.status || 0;
    const errorConfig = HTTP_ERROR_CONFIGS[status];
    
    // 如果服务器返回了详细的错误信息，优先使用
    const serverMessage = (error.response?.data as ErrorResponse)?.message;
    const message = serverMessage || errorConfig?.message || error.message || '网络错误，请稍后重试';
    
    // 执行错误对应的action（如401跳转登录）
    if (errorConfig?.action) {
        errorConfig.action();
    }
    
    return message;
};

// 创建axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, // 超时时间调整为10秒
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 获取用户仓库
        const userStore = useUserStore();
        
        // 携带token
        if (userStore.userInfo.token) {
            config.headers.token = userStore.userInfo.token;
        }
        
        return config;
    },
    (error: AxiosError) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
        // 简化返回数据，直接返回data
        return response.data;
    },
    (error: AxiosError) => {
        // 打印错误详情便于调试
        if (error.response?.data) {
            console.error('API Error Response:', error.response.data);
        }
        
        // 统一处理HTTP错误
        const message = handleHttpError(error);
        
        // 显示错误提示
        ElMessage({
            type: 'error',
            message,
            duration: 3000,
        });
        
        return Promise.reject(new Error(message));
    }
);

export default request;

// 导出错误处理函数供其他模块使用
export { handleHttpError };
