<template>
    <div class="wx-login-container">
        <el-icon class="loading-icon" :size="40">
            <Loading />
        </el-icon>
        <p>登录中，请稍候...</p>
    </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue';
import { SET_TOKEN } from '@/utils/user';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';

let $route = useRoute();
let $router = useRouter();
let userStore = useUserStore();

console.log('微信登录回调参数:', $route.query);

// 获取回调参数
const { code } = $route.query;

// 判断是否是开发环境的模拟登录（code 以 MOCK_CODE_ 开头）
if (code && String(code).startsWith('MOCK_CODE_')) {
    // 模拟登录：生成模拟的用户信息
    const mockUserInfo = {
        name: '测试用户',
        token: 'mock_token_' + Date.now(),
    };

    // 存储用户信息
    SET_TOKEN(JSON.stringify(mockUserInfo));
    // 更新 store 中的用户信息
    userStore.userInfo = mockUserInfo;
    // 关闭登录弹窗
    userStore.visible = false;

    console.log('模拟登录成功，用户信息:', mockUserInfo);
} else {
    // 真实微信登录：这里应该调用后端接口用 code 换取用户信息
    // TODO: 调用后端接口获取真实用户信息
    SET_TOKEN(JSON.stringify($route.query));
}

// 登录成功后跳转回首页
$router.replace('/home');
</script>

<style scoped lang="scss">
.wx-login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .loading-icon {
        animation: rotate 1s linear infinite;
        color: #409eff;
        margin-bottom: 16px;
    }

    p {
        color: #666;
        font-size: 14px;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>