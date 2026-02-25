<template>
  <div class="top">
    <div class="content">
        <!-- 左侧: Logo & Title -->
        <div class="left" @click="goHome">
            <div class="logo-wrapper">
                <img src="@/assets/logo.png" alt="logo">
            </div>
            <p>通用医疗 预约挂号统一平台</p>
        </div>

        <!-- 右侧: Help & User -->
        <div class="right">
            <p class="help">帮助中心</p>
            <!-- 如果没有用户名字：显示登录注册 -->
            <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
            <!-- 如果有用户名字，则显示用户名字与下拉菜单 -->
            <el-dropdown v-else>
                <span class="el-dropdown-link">
                    <div class="user-avatar">
                        {{ userStore.userInfo.name[0] }}
                    </div>
                    {{ userStore.userInfo.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="goUser('/user/certification')">实名验证</el-dropdown-item>
                        <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                        <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
  </div>
</template>

<script setup lang="ts">
//导入element-ui图标样式
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter,useRoute } from 'vue-router';
//获取user相关仓库的数据(visible)可以控制login组件对话框的显示与隐藏
import useUserStore from '@/store/modules/user'
let userStore = useUserStore();

//创建路由对象
const $router = useRouter();
//获取路由对象
let $route = useRoute();
//点击返回首页
const goHome = () => {
    $router.push({
        path: '/'
    })
}
//点击铵钮显示登录/注册
const login = ()=>{
    userStore.visible = true;
}

//退出登录与注册按钮的回调
const logout = ()=>{
    //通知pinna仓库清除用户相关的信息
    userStore.logout();
    //编程式导航返回首页
    $router.push({path: '/home'});
}

//点击顶部下拉菜单进行路由跳转
const goUser = (path: string) => {
    $router.push({ path: path, query: $route.query });
}

</script>

<style scoped lang="scss">
.top {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: $header-height;
    background: $color-bg-card;
    display: flex;
    justify-content: center;
    box-shadow: $shadow-md;
    transition: box-shadow $transition-base;
    
    .content {
        width: $container-width;
        height: 100%;
        @include flex-between;
        padding: 0 $spacing-lg;
        
        .left {
            @include flex-center;
            cursor: pointer;
            transition: opacity $transition-base;
            
            &:hover {
                opacity: 0.8;
            }
            
            .logo-wrapper {
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, $color-primary 0%, $color-primary-dark 100%);
                border-radius: $radius-md;
                @include flex-center;
                margin-right: $spacing-md;
                
                img {
                    width: 32px;
                    height: 32px;
                    object-fit: contain;
                    filter: brightness(0) invert(1); // Make logo white if it's colored
                }
            }
            
            p {
                font-size: $font-size-xl;
                font-weight: 700;
                color: $color-primary;
                letter-spacing: -0.3px;
            }
        }
        
        .right {
            @include flex-center;
            font-size: $font-size-sm;
            gap: $spacing-lg;
            
            .help {
                color: $color-text-secondary;
                cursor: pointer;
                transition: color $transition-base;
                font-weight: 500;
                
                &:hover {
                    color: $color-primary;
                }
            }
            
            .login {
                color: $color-primary;
                cursor: pointer;
                font-weight: 600;
                padding: $spacing-sm $spacing-xl;
                border: 1.5px solid $color-primary;
                border-radius: $radius-full;
                transition: all $transition-base;
                
                &:hover {
                    background: $color-primary;
                    color: white;
                    transform: translateY(-1px);
                    box-shadow: $shadow-sm;
                }
            }
            
            // 下拉菜单样式
            ::v-deep(.el-dropdown) {
                .el-dropdown-link {
                    @include flex-center;
                    gap: $spacing-sm;
                    color: $color-text-primary;
                    font-weight: 600;
                    cursor: pointer;
                    padding: $spacing-xs $spacing-sm;
                    border-radius: $radius-md;
                    transition: all $transition-base;
                    
                    &:hover {
                        background: $color-bg-hover;
                    }
                    
                    .user-avatar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, $color-primary 0%, $color-success 100%);
                        @include flex-center;
                        color: white;
                        font-weight: 600;
                        font-size: $font-size-sm;
                    }
                    
                    .el-icon {
                        font-size: 12px;
                        color: $color-text-muted;
                        transition: transform $transition-base;
                    }
                    
                    &:hover .el-icon {
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}

// 下拉菜单全局样式调整 (需要放在全局或 :global 中)
:global(.el-dropdown__menu) {
    border-radius: $radius-lg !important;
    box-shadow: $shadow-xl !important;
    border: 1px solid $color-border !important;
    padding: $spacing-xs !important;
    
    .el-dropdown-menu__item {
        border-radius: $radius-md;
        padding: $spacing-sm $spacing-md;
        font-size: $font-size-sm;
        color: $color-text-secondary;
        transition: all $transition-fast;
        
        &:hover {
            background: $color-primary-light !important;
            color: $color-primary !important;
        }
    }
}
</style>
