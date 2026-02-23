/**
 * 用户信息存储工具
 * 功能：
 * 1. 用户信息的本地存储与读取
 * 2. 简单的数据混淆（非加密，仅防止直接查看）
 * 3. 敏感信息脱敏工具
 */

const STORAGE_KEY = 'USERINFO';
const OBFUSCATE_KEY = 'syt_user_v1'; // 混淆密钥

/**
 * 简单的字符串混淆（非真正加密，仅防止直接查看）
 * 生产环境建议使用 crypto-js 等真正的加密库
 */
const obfuscate = (data: string): string => {
    try {
        // Base64编码 + 简单字符位移
        const base64 = btoa(encodeURIComponent(data));
        return base64.split('').map((char, index) => {
            const keyChar = OBFUSCATE_KEY.charAt(index % OBFUSCATE_KEY.length);
            return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
        }).join('');
    } catch {
        return data;
    }
};

/**
 * 解混淆
 */
const deobfuscate = (data: string): string => {
    try {
        // 逆向字符位移 + Base64解码
        const decoded = data.split('').map((char, index) => {
            const keyChar = OBFUSCATE_KEY.charAt(index % OBFUSCATE_KEY.length);
            return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
        }).join('');
        return decodeURIComponent(atob(decoded));
    } catch {
        // 如果解混淆失败，尝试直接返回（兼容旧数据）
        return data;
    }
};

/**
 * 存储用户信息到本地存储
 * @param userInfo 用户信息字符串(JSON)
 */
export const SET_TOKEN = (userInfo: string): void => {
    try {
        const obfuscated = obfuscate(userInfo);
        localStorage.setItem(STORAGE_KEY, obfuscated);
    } catch (error) {
        console.error('存储用户信息失败:', error);
        // 回退到直接存储
        localStorage.setItem(STORAGE_KEY, userInfo);
    }
};

/**
 * 获取本地存储的用户信息
 * @returns 用户信息字符串(JSON)或null
 */
export const GET_TOKEN = (): string | null => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        
        // 尝试解混淆
        const deobfuscated = deobfuscate(stored);
        
        // 验证是否为有效JSON
        JSON.parse(deobfuscated);
        return deobfuscated;
    } catch {
        // 如果解混淆或解析失败，尝试直接返回（兼容旧数据）
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                JSON.parse(stored);
                return stored;
            } catch {
                // 数据损坏，清除
                REMOVE_TOKEN();
            }
        }
        return null;
    }
};

/**
 * 清除本地存储的用户信息
 */
export const REMOVE_TOKEN = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};

/**
 * 身份证号码脱敏
 * 显示格式：前6位 + **** + 后4位
 * @param idCard 身份证号码
 * @returns 脱敏后的身份证号码
 */
export const maskIdCard = (idCard: string): string => {
    if (!idCard || idCard.length < 10) return idCard;
    return idCard.replace(/^(.{6})(.*)(.{4})$/, '$1****$3');
};

/**
 * 手机号码脱敏
 * 显示格式：前3位 + **** + 后4位
 * @param phone 手机号码
 * @returns 脱敏后的手机号码
 */
export const maskPhone = (phone: string): string => {
    if (!phone || phone.length < 7) return phone;
    return phone.replace(/^(.{3})(.*)(.{4})$/, '$1****$3');
};

/**
 * 姓名脱敏
 * 显示格式：第一个字 + *
 * @param name 姓名
 * @returns 脱敏后的姓名
 */
export const maskName = (name: string): string => {
    if (!name || name.length < 2) return name;
    return name[0] + '*'.repeat(name.length - 1);
};

/**
 * 检查用户是否已登录
 * @returns 是否已登录
 */
export const isLoggedIn = (): boolean => {
    const token = GET_TOKEN();
    if (!token) return false;
    
    try {
        const userInfo = JSON.parse(token);
        return !!userInfo.token;
    } catch {
        return false;
    }
};