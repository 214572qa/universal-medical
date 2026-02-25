import { PHONE_REGEXP, CODE_REGEXP } from '@/utils/constants/regexp';

/**
 * 验证手机号
 * @param rule 验证规则
 * @param value 验证值
 * @param callback 回调函数
 */
export const validatePhone = (_rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请输入手机号码'));
    } else if (!PHONE_REGEXP.test(value)) {
        callback(new Error('手机号码格式不正确'));
    } else {
        callback();
    }
};

/**
 * 验证验证码
 * @param rule 验证规则
 * @param value 验证值
 * @param callback 回调函数
 */
export const validateCode = (_rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('请输入验证码'));
    } else if (!CODE_REGEXP.test(value)) {
        callback(new Error('验证码必须为6位数字'));
    } else {
        callback();
    }
};
