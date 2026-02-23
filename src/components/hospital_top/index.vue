<template>
  <div class="top">
    <div class="content">
        <!-- 左侧 -->
        <div class="left" @click="goHome">
            <img src="@/assets/logo.png" alt="">
            <p>尚医通   预约挂号统一平台</p>
        </div>

        <!-- 右侧 -->
        <div class="right">
            <p class="help">帮助中心</p>
            <!-- 如果没有用户名字：显示登录注册 -->
            <p class="login" @click="login" v-if="!userStore.userInfo.name">登录/注册</p>
            <!-- 如果有用户名字，则显示用户名字与下拉菜单 -->
            <el-dropdown v-else>
                <span class="el-dropdown-link">
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
    //通知Pinia仓库清除用户相关的信息
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
.top{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;
    
    .content{
        width: 1200px;
        height: 70px;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
            p{
                font-size: 20px;
                font-weight: 700;
                color: #55a6fe;
            }
        }
        .right{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #bbb;
            .help{
                margin-right: 10px;
            }
            
        }
    }
}
</style>
