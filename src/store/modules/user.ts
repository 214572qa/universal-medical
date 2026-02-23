/**
 * 用户相关状态管理
 * 功能：
 * 1. 用户登录/登出
 * 2. 验证码获取
 * 3. 微信扫码登录状态轮询
 * 4. 登录弹窗控制
 */
import { defineStore } from 'pinia';
import { reqCode, reqUserLogin } from '@/api/hospital';
import type { LoginData, UserLoginResponseData } from '@/api/hospital/type';
import type { UserState } from '@/store/modules/interface/index';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/user';

// 定时器ID类型
type TimerId = ReturnType<typeof setInterval> | null;

// 存储当前轮询定时器ID，用于清理
let queryStateTimer: TimerId = null;

// 轮询配置
const POLLING_CONFIG = {
    interval: 1000,      // 轮询间隔(ms)
    maxAttempts: 120,    // 最大尝试次数(2分钟)
};

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        visible: false,              // 控制登录弹窗的显示与隐藏
        code: '',                    // 存储用户的验证码
        userInfo: GET_TOKEN() ? JSON.parse(GET_TOKEN() as string) : { name: '', token: '' },
    }),
    
    actions: {
        /**
         * 设置登录弹窗的显示与隐藏
         */
        setVisible(flag: boolean) {
            this.visible = flag;
            // 关闭弹窗时清理定时器
            if (!flag) {
                this.stopQueryState();
            }
        },
        
        /**
         * 获取手机验证码
         */
        async getCode(phone: string): Promise<string> {
            try {
                const result = await reqCode(phone);
                if (result.code === 200) {
                    this.code = result.data;
                    return 'ok';
                }
                return Promise.reject(new Error(result.message));
            } catch (error) {
                return Promise.reject(error);
            }
        },
        
        /**
         * 用户手机号码登录
         */
        async userLogin(loginData: LoginData): Promise<string> {
            const result: UserLoginResponseData = await reqUserLogin(loginData);
            if (result.code === 200) {
                this.userInfo = result.data;
                SET_TOKEN(JSON.stringify(this.userInfo));
                return 'ok';
            }
            return Promise.reject(new Error(result.message));
        },
        
        /**
         * 退出登录
         */
        logout() {
            // 清理轮询定时器
            this.stopQueryState();
            // 清空仓库的数据
            this.userInfo = { name: '', token: '' };
            // 清除本地存储的用户信息
            REMOVE_TOKEN();
        },
        
        /**
         * 查询微信扫码登录状态
         * 轮询本地存储检查用户信息
         */
        queryState() {
            // 先清理已有的定时器，防止重复创建
            this.stopQueryState();
            
            let attempts = 0;
            
            queryStateTimer = setInterval(() => {
                attempts++;
                
                // 超过最大尝试次数，停止轮询
                if (attempts >= POLLING_CONFIG.maxAttempts) {
                    console.warn('微信登录轮询超时，已停止');
                    this.stopQueryState();
                    return;
                }
                
                // 检查本地存储是否有用户信息
                const token = GET_TOKEN();
                if (token) {
                    try {
                        this.userInfo = JSON.parse(token);
                        this.visible = false;
                        this.stopQueryState();
                    } catch (e) {
                        console.error('解析用户信息失败:', e);
                    }
                }
            }, POLLING_CONFIG.interval);
        },
        
        /**
         * 停止微信登录状态轮询
         * 解决定时器未清理导致的内存泄漏问题
         */
        stopQueryState() {
            if (queryStateTimer !== null) {
                clearInterval(queryStateTimer);
                queryStateTimer = null;
            }
        },
    },
    
    getters: {
        /**
         * 用户是否已登录
         */
        isLoggedIn(): boolean {
            return !!this.userInfo.token;
        },
        
        /**
         * 获取用户名称
         */
        userName(): string {
            return this.userInfo.name || '未登录';
        },
    },
});

export default useUserStore;