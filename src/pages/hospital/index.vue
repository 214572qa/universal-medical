<template>
    <div class="hospital">
        <!-- 左侧导航区域 -->
        <div class="menu">
            <div class="top">
               <el-icon>
                    <HomeFilled />
                </el-icon>
                <span> / 医院信息</span>
            </div>
           <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                    <!-- 书签装饰 -->
                    <div class="bookmark-decoration" v-if="$route.path === '/hospital/register'">
                        <div class="bookmark-ribbon"></div>
                    </div>
                </el-menu-item>
                <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>医院详情</span>
                    <div class="bookmark-decoration" v-if="$route.path === '/hospital/detail'">
                        <div class="bookmark-ribbon"></div>
                    </div>
                </el-menu-item>
                <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
                    <el-icon>
                        <BellFilled />
                    </el-icon>
                    <span>预约通知</span>
                    <div class="bookmark-decoration" v-if="$route.path === '/hospital/notice'">
                        <div class="bookmark-ribbon"></div>
                    </div>
                </el-menu-item>
                 <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>停诊信息</span>
                    <div class="bookmark-decoration" v-if="$route.path === '/hospital/close'">
                        <div class="bookmark-ribbon"></div>
                    </div>
                </el-menu-item>
                 <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询取消</span>
                    <div class="bookmark-decoration" v-if="$route.path === '/hospital/search'">
                        <div class="bookmark-ribbon"></div>
                    </div>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧内容展示区域：路由组件展示位置 -->
        <div class="content">
            <!-- 子组件展示结构的地方 -->
             <router-view v-slot="{ Component }">
                <transition name="slide-left" mode="out-in">
                    <component :is="Component" />
                </transition>
             </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
//引入左侧菜单图标
import { Document,Calendar,InfoFilled,Search,BellFilled,HomeFilled } from '@element-plus/icons-vue'

//引入生命周期函数
import { onMounted } from 'vue';
//引入仓库
import useDetailStore from "@/store/modules/hospitalDetail";
//获取仓库对象
let detailStore = useDetailStore();

import { useRouter,useRoute } from 'vue-router';
//定义路由
let $router = useRouter();
let $route = useRoute();


//左侧菜单需要用到的图标
const changeActive = (path:string) =>{
    //跳转到对应的二级路由页面
    $router.push({
        path,
        query:{
            hoscode:$route.query.hoscode
        }
    });
}

//组件挂载完毕时：通知pinia仓库发起请求获取医院详情的数据，存储与仓库当中
onMounted(() => {
   const code = $route.query.hoscode as string;
   if (code) {
     detailStore.getHospital(code);
   }
});
</script>

<style scoped lang="scss">
// 引入全局变量（模拟，实际项目中应在 assets/styles/variables.scss 中定义）
$color-primary: #3488ce;
$color-bg: #f5f7fa;
$color-white: #ffffff;
$color-text-main: #333;
$color-text-sub: #666;
$shadow-light: 0 4px 12px rgba(0, 0, 0, 0.03);
$border-radius: 8px;

.hospital {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(135deg, #e8f4fc 0%, #f0f9f6 50%, #e6f3ff 100%);
    background-image: url('/src/assets/medical-bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 20px 0;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(10px);
        z-index: 0;
    }

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
        position: relative;
        z-index: 1;

        .top {
            color: $color-text-sub;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 500;
            width: 80%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
            backdrop-filter: blur(10px);
            
            .el-icon {
                margin-right: 6px;
                font-size: 16px;
                color: $color-primary;
            }
        }

        .el-menu {
            width: 80%;
            border-right: none;
            background: transparent;

            .el-menu-item {
                margin-bottom: 12px;
                height: 56px;
                line-height: 56px;
                border-radius: 12px;
                color: $color-text-sub;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 15px;
                position: relative;
                overflow: visible;
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(10px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

                .el-icon {
                    margin-right: 12px;
                    font-size: 20px;
                    transition: all 0.3s ease;
                }

                span {
                    font-family: 'Microsoft YaHei', sans-serif;
                    font-weight: 500;
                }

                // Hover 效果
                &:hover {
                    background: rgba(255, 255, 255, 0.95);
                    color: $color-primary;
                    transform: translateX(8px);
                    box-shadow: 0 4px 16px rgba(52, 136, 206, 0.15);

                    .el-icon {
                        transform: scale(1.1);
                    }
                }

                // 选中状态 - 强化书签效果
                &.is-active {
                    background: linear-gradient(135deg, #e8f4fc 0%, #d4edff 100%);
                    color: $color-primary;
                    font-weight: 600;
                    box-shadow: 
                        0 4px 20px rgba(52, 136, 206, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);
                    transform: translateX(12px);
                    
                    // 左侧彩色指示条
                    &::before {
                        content: '';
                        position: absolute;
                        left: -4px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 6px;
                        height: 32px;
                        background: linear-gradient(180deg, #3488ce 0%, #5aa3e0 100%);
                        border-radius: 0 4px 4px 0;
                        box-shadow: 2px 0 8px rgba(52, 136, 206, 0.4);
                    }

                    // 书签装饰
                    .bookmark-decoration {
                        position: absolute;
                        right: -12px;
                        top: 0;
                        width: 24px;
                        height: 100%;
                        pointer-events: none;
                        z-index: 10;

                        .bookmark-ribbon {
                            position: absolute;
                            right: 0;
                            top: 8px;
                            width: 0;
                            height: 0;
                            border-style: solid;
                            border-width: 20px 12px 20px 0;
                            border-color: transparent #3488ce transparent transparent;
                            filter: drop-shadow(-2px 2px 4px rgba(52, 136, 206, 0.3));
                            animation: bookmarkPulse 2s ease-in-out infinite;

                            &::after {
                                content: '';
                                position: absolute;
                                right: -12px;
                                top: 20px;
                                width: 0;
                                height: 0;
                                border-style: solid;
                                border-width: 8px 6px 0 6px;
                                border-color: #2a6ca8 transparent transparent transparent;
                            }
                        }
                    }
                }
            }
        }
    }

    .content {
        flex: 8;
        padding-right: 40px;
        min-width: 0;
        position: relative;
        z-index: 1;
    }
}

// 书签脉冲动画
@keyframes bookmarkPulse {
    0%, 100% {
        filter: drop-shadow(-2px 2px 4px rgba(52, 136, 206, 0.3));
    }
    50% {
        filter: drop-shadow(-2px 2px 8px rgba(52, 136, 206, 0.5));
    }
}

// 页面切换动画 - 从右往左滑动
.slide-left-enter-active,
.slide-left-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

// 响应式
@media (max-width: 1200px) {
    .hospital {
        .menu {
            flex: 2.5;
        }
        .content {
            padding-right: 20px;
        }
    }
}
</style>
