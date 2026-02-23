<template>
    <div class="user">
        <!-- 左侧显示导航区域 -->
        <div class="menu">
            <div class="top">
                <el-icon>
                    <CreditCard />
                </el-icon>
                <span>/ 会员中心</span>
            </div>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification" @click="goUser('/user/certification')">
                    <el-icon>
                        <Postcard />
                    </el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order" @click="goUser('/user/order')">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient" @click="goUser('/user/patient')" >
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile" @click="goUser('/user/profile')">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback" @click="goUser('/user/feedback')">
                    <el-icon>
                        <Message />
                    </el-icon>
                    <span>意见反馈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧显示会员中心二级路由组件区域 -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
//prettier-ignore
import { CreditCard, Postcard, Memo, User, Setting, Message } from '@element-plus/icons-vue'
//引入路由器
import { useRouter, useRoute } from 'vue-router'
//获取路由器实例
const $router = useRouter()
//获取路由对象
let $route = useRoute()
//点击左侧菜单实现路由跳转
const goUser = (path: string) => {
    $router.push({ path: path, query: $route.query });
}
</script>

<style scoped lang="scss">
.user {
    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content {
        flex: 8;
    }
}
</style>