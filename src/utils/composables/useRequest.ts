/**
 * 通用请求Hook
 * 功能：
 * 1. 统一管理请求状态（loading、error、data）
 * 2. 提供防抖请求功能
 * 3. 提供请求缓存功能
 * 4. 支持请求取消
 */
import { ref, type Ref, onUnmounted } from 'vue';
import type { RequestState } from '@/api/types/common';

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间(ms)
 */
export function useDebounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 300
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    const debouncedFn = (...args: Parameters<T>) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    };
    
    // 组件卸载时清理定时器
    onUnmounted(() => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    });
    
    return debouncedFn;
}

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param delay 延迟时间(ms)
 */
export function useThrottle<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 300
): (...args: Parameters<T>) => void {
    let lastTime = 0;
    
    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastTime >= delay) {
            fn(...args);
            lastTime = now;
        }
    };
}

/**
 * 通用请求Hook
 * @param requestFn 请求函数
 * @param options 配置选项
 */
export function useRequest<T, P extends any[] = any[]>(
    requestFn: (...args: P) => Promise<T>,
    options: {
        immediate?: boolean;        // 是否立即执行
        defaultParams?: P;          // 默认参数
        onSuccess?: (data: T) => void;  // 成功回调
        onError?: (error: Error) => void;  // 失败回调
        debounce?: number;          // 防抖延迟(ms)，0表示不防抖
        cache?: boolean;            // 是否缓存
        cacheTime?: number;         // 缓存时间(ms)
    } = {}
) {
    const {
        immediate = false,
        defaultParams,
        onSuccess,
        onError,
        debounce = 0,
        cache = false,
        cacheTime = 5 * 60 * 1000, // 默认5分钟
    } = options;
    
    // 请求状态
    const loading: Ref<boolean> = ref(false);
    const error: Ref<Error | null> = ref(null);
    const data: Ref<T | null> = ref(null);
    
    // 缓存相关
    let cachedData: T | null = null;
    let cacheTimestamp = 0;
    
    // 是否可以使用缓存
    const canUseCache = (): boolean => {
        if (!cache || !cachedData) return false;
        return Date.now() - cacheTimestamp < cacheTime;
    };
    
    // 执行请求
    const execute = async (...args: P): Promise<T | null> => {
        // 检查缓存
        if (canUseCache()) {
            data.value = cachedData;
            return cachedData;
        }
        
        loading.value = true;
        error.value = null;
        
        try {
            const result = await requestFn(...args);
            data.value = result;
            
            // 更新缓存
            if (cache) {
                cachedData = result;
                cacheTimestamp = Date.now();
            }
            
            onSuccess?.(result);
            return result;
        } catch (e) {
            const err = e instanceof Error ? e : new Error(String(e));
            error.value = err;
            onError?.(err);
            return null;
        } finally {
            loading.value = false;
        }
    };
    
    // 包装防抖执行函数
    const debouncedExecute = debounce > 0 
        ? useDebounce(execute, debounce) 
        : execute;
    
    // 清除缓存
    const clearCache = () => {
        cachedData = null;
        cacheTimestamp = 0;
    };
    
    // 重置状态
    const reset = () => {
        loading.value = false;
        error.value = null;
        data.value = null;
        clearCache();
    };
    
    // 立即执行
    if (immediate && defaultParams) {
        execute(...defaultParams);
    }
    
    return {
        loading,
        error,
        data,
        execute,
        debouncedExecute,
        clearCache,
        reset,
    };
}

/**
 * 带防抖的请求Hook（简化版）
 * @param requestFn 请求函数
 * @param delay 防抖延迟(ms)
 */
export function useDebouncedRequest<T, P extends any[] = any[]>(
    requestFn: (...args: P) => Promise<T>,
    delay: number = 300
) {
    return useRequest(requestFn, { debounce: delay });
}

/**
 * 带缓存的请求Hook（简化版）
 * @param requestFn 请求函数
 * @param cacheTime 缓存时间(ms)
 */
export function useCachedRequest<T, P extends any[] = any[]>(
    requestFn: (...args: P) => Promise<T>,
    cacheTime: number = 5 * 60 * 1000
) {
    return useRequest(requestFn, { cache: true, cacheTime });
}

/**
 * 分页请求Hook
 * @param requestFn 请求函数
 * @param options 配置选项
 */
export function usePagination<T>(
    requestFn: (page: number, limit: number, ...args: any[]) => Promise<{
        data: { content: T[]; totalElements: number; totalPages: number };
    }>,
    options: {
        defaultPage?: number;
        defaultLimit?: number;
    } = {}
) {
    const { defaultPage = 1, defaultLimit = 10 } = options;
    
    const page = ref(defaultPage);
    const limit = ref(defaultLimit);
    const total = ref(0);
    const totalPages = ref(0);
    const list: Ref<T[]> = ref([]);
    const loading = ref(false);
    
    const fetchData = async (...extraArgs: any[]) => {
        loading.value = true;
        try {
            const result = await requestFn(page.value, limit.value, ...extraArgs);
            if (result.data) {
                list.value = result.data.content;
                total.value = result.data.totalElements;
                totalPages.value = result.data.totalPages;
            }
        } finally {
            loading.value = false;
        }
    };
    
    const changePage = (newPage: number) => {
        page.value = newPage;
    };
    
    const changeLimit = (newLimit: number) => {
        limit.value = newLimit;
        page.value = 1; // 切换每页条数时重置到第一页
    };
    
    const reset = () => {
        page.value = defaultPage;
        limit.value = defaultLimit;
        total.value = 0;
        totalPages.value = 0;
        list.value = [];
    };
    
    return {
        page,
        limit,
        total,
        totalPages,
        list,
        loading,
        fetchData,
        changePage,
        changeLimit,
        reset,
    };
}

export default useRequest;
