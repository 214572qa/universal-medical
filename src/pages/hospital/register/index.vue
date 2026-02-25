<template>
    <div class="register">
        <!-- 顶部标题区 -->
        <div class="top">
           <div class="title">{{ hospitalStore.hospitalInfo.hospital?.hosname}}</div> 
           <div class="level">
               <svg t="1768384655497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3228" width="16" height="16"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="#d81e06" p-id="3229"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.351098-0.122737 0-0.221998 0.047072-0.319236 0.047072l-490.386559-0.197498 0-195.773036 0.785899-222.227314 0-54.881958c0-0.271176 0.148379-0.515745 0.148379-0.785899l0-0.73678c0-0.221998-0.148379-0.417449-0.148379-0.638424L294.523647 496.641109l496.302083 0c0.319236 0 0.638424-0.025583 0.956636-0.025583 0.319236 0 0.638424 0.025583 0.956636 0.025583l0.221998 0c1.251663 0.024536 2.478093 0.171893 3.683336 0.417449 0.73678 0.147357 1.450025 0.343831 2.161224 0.589387 0.73678 0.245556 1.449001 0.539245 2.161224 0.859456 0.687081 0.319236 1.350906 0.662706 1.991533 1.055028 0.662706 0.417449 1.30231 0.858409 1.916653 1.350906 0.613319 0.466262 1.202427 0.981054 1.769368 1.547995 0.564918 0.564918 1.07971 1.155049 1.546995 1.769368 0.490164 0.638424 0.931124 1.30231 1.325493 2.014533 0.39295 0.687081 0.73678 1.423838 1.031493 2.18576 0.294712 0.73678 0.540269 1.498702 0.73678 2.283624 0.195451 0.785899 0.343831 1.596028 0.441069 2.431378 0.098238 0.810129 0.147357 1.645479 0.147357 2.505939C894.318227 484.824988 894.12274 485.856936 893.82573 486.837924z" fill="#d81e06" p-id="3230"></path></svg>
               <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
           </div>
        </div>

        <!-- 统一的白色卡片容器 -->
        <div class="hospital-card">
            <!-- 医院基础信息与规则区 -->
             <div class="info-section">
                <div class="logo-wrapper">
                    <img :src="hospitalStore.hospitalInfo.hospital?.logoData" alt="hospital logo">
                </div>
                <div class="rules-content">
                    <div class="section-title">
                        <span class="title-icon">📋</span>
                        挂号规则
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="label">预约周期：</span>
                            <span class="value">10天</span>
                        </div>
                        <div class="info-item">
                            <span class="label">放号时间：</span>
                            <span class="value">{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">停挂时间：</span>
                            <span class="value">{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">退号时间：</span>
                            <span class="value">就诊前一个工作日 {{ hospitalStore.hospitalInfo.bookingRule?.quitTime }} 前取消</span>
                        </div>
                        <div class="info-item full-width">
                            <span class="label">医院地址：</span>
                            <span class="value">{{ hospitalStore.hospitalInfo.hospital?.address }}</span>
                        </div>
                        <div class="info-item full-width">
                            <span class="label">交通路线：</span>
                            <span class="value">{{ hospitalStore.hospitalInfo.hospital?.route }}</span>
                        </div>
                    </div>
                    
                    <!-- 具体规则区域 - 带滑动动画 -->
                    <div class="rule-details-wrapper" :class="{ 'show': showRules }">
                        <div class="rule-details">
                            <div class="sub-title">
                                <span class="icon">📌</span>
                                具体规则：
                            </div>
                            <ul class="rule-list">
                                <li v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
                                    <span class="rule-number">{{ index + 1 }}</span>
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
             </div>
             
             <!-- 科室选择区 -->
              <div class="department-section">
                <!-- 左侧科室分类导航 -->
                <div class="left-nav">
                    <ul>
                        <li @click="changeIndex(index)" :class="{'active':index === currentIndex}" v-for="(deparment, index) in hospitalStore.deparmentArr" :key="deparment.depcode">
                            <span class="nav-text">{{ deparment.depname }}</span>
                            <div class="nav-indicator"></div>
                        </li>
                    </ul>
                </div>
                
                <!-- 右侧详细科室列表 -->
                <div class="right-list">
                   <!-- 遍历显示所有大科室及其子科室 -->
                    <div class="department-group" v-for="(deparment) in hospitalStore.deparmentArr" :key="deparment.depcode">
                        <div class="group-header cur">
                            <span class="tag">科室分类</span>
                            <span class="name">{{ deparment.depname }}</span>
                        </div>
                        <ul class="sub-dept-grid">
                            <li @click="showLogin(item)" v-for="(item) in deparment.children" :key="item.depcode">
                                <span class="dept-name">{{ item.depname }}</span>
                                <div class="hover-effect">
                                    <span class="arrow">→</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
              </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
//引入路由相关 Hooks
import { useRoute, useRouter } from 'vue-router';
//引入医院详情仓库的数据
import useDetailStore from '@/store/modules/hospitalDetail';
let hospitalStore = useDetailStore();
//获取路由器
let $router = useRouter();
//获取路由对象
let $route = useRoute();
//控制科室高亮的响应式数组
let currentIndex = ref<number>(0);
//控制规则显示动画
let showRules = ref<boolean>(false);

//点击科室切换高亮的函数
const changeIndex = (index: number) => {
    currentIndex.value = index;
    
    // 使用 nextTick 确保 DOM 更新后再执行滚动
    nextTick(() => {
        //点击导航获取右侧科室（大的科室H1标题）
        const allHeaders = document.querySelectorAll('.cur');
        const targetIndex = currentIndex.value;
        
        //滚动到对应科室的位置
        if (targetIndex !== undefined && allHeaders[targetIndex]) {
            const targetElement = allHeaders[targetIndex] as HTMLElement;
            // 考虑顶部吸顶高度或padding，稍微偏移
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
};

//组件挂载完毕时：获取医院科室数据
onMounted(() => {
    const hoscode = $route.query.hoscode as string;
    if (hoscode) {
        //调用store的方法获取科室数据
        hospitalStore.getDeparment(hoscode);
    }
    
    // 延迟显示规则动画
    setTimeout(() => {
        showRules.value = true;
    }, 300);
});

//点击科室显示登录/注册
//item即为用户选中的科室的数据
const showLogin = (item:any)=>{
    //点击某一个医院科室按钮，进入到相应的预约挂号详情页面
    //跳转到预约挂号详情页面
    $router.push({
        path: '/hospital/register_step1',
        query: {
            hoscode: $route.query.hoscode,
            depcode: item.depcode
        }
    })
}
</script>

<style scoped lang="scss">
// 变量定义
$color-primary: #3488ce;
$color-primary-light: #5aa3e0;
$color-primary-dark: #2a6ca8;
$color-text-main: #333;
$color-text-secondary: #666;
$color-text-light: #999;
$color-bg-light: #f9f9f9;
$color-border: #ebeef5;
$shadow-card: 0 8px 32px rgba(0, 0, 0, 0.08);
$shadow-hover: 0 12px 40px rgba(52, 136, 206, 0.15);
$radius-card: 16px;
$radius-item: 12px;

.register {
    font-family: 'Microsoft YaHei', sans-serif;
    color: $color-text-main;

    // 顶部标题
    .top {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        
        .title {
            font-size: 28px;
            font-weight: bold;
            color: $color-text-main;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .level {
            margin-left: 16px;
            display: flex;
            align-items: center;
            color: $color-text-secondary;
            font-size: 14px;
            background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
            padding: 6px 16px;
            border-radius: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            border: 1px solid rgba(52, 136, 206, 0.1);
            
            span {
                margin-left: 6px;
            }
        }
    }

    // 统一大卡片
    .hospital-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: $radius-card;
        box-shadow: $shadow-card;
        padding: 32px;
        min-height: 600px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.8);
        position: relative;
        overflow: hidden;

        // 卡片背景装饰
        &::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(52, 136, 206, 0.05) 0%, transparent 70%);
            pointer-events: none;
        }
    }

    // 1. 顶部信息区
    .info-section {
        display: flex;
        margin-bottom: 40px;
        border-bottom: 1px solid $color-border;
        padding-bottom: 30px;
        position: relative;

        .logo-wrapper {
            width: 120px;
            height: 120px;
            flex-shrink: 0;
            margin-right: 30px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #fff;
            padding: 4px;
            background: linear-gradient(135deg, $color-primary 0%, $color-primary-light 100%);
            box-shadow: 0 4px 16px rgba(52, 136, 206, 0.2);

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                background: #fff;
            }
        }

        .rules-content {
            flex: 1;

            .section-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: $color-primary;
                display: flex;
                align-items: center;

                .title-icon {
                    margin-right: 10px;
                    font-size: 24px;
                }

                &::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 22px;
                    background: linear-gradient(180deg, $color-primary 0%, $color-primary-light 100%);
                    margin-right: 12px;
                    border-radius: 2px;
                }
            }

            .info-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 14px 28px;
                margin-bottom: 24px;

                .info-item {
                    font-size: 14px;
                    line-height: 1.7;
                    padding: 8px 12px;
                    background: rgba(248, 250, 252, 0.8);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    
                    &:hover {
                        background: rgba(232, 244, 252, 0.8);
                        transform: translateX(4px);
                    }
                    
                    &.full-width {
                        grid-column: span 2;
                    }

                    .label {
                        color: $color-text-secondary;
                        font-weight: 500;
                    }
                    .value {
                        color: $color-text-main;
                        font-weight: 600;
                    }
                }
            }

            // 规则详情包装器 - 滑动动画
            .rule-details-wrapper {
                overflow: hidden;
                max-height: 0;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

                &.show {
                    max-height: 500px;
                    opacity: 1;
                    transform: translateX(0);
                }

                .rule-details {
                    background: linear-gradient(135deg, #f0f9ff 0%, #e8f4fc 100%);
                    padding: 20px;
                    border-radius: $radius-item;
                    border-left: 4px solid $color-primary;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);

                    .sub-title {
                        font-size: 15px;
                        font-weight: bold;
                        margin-bottom: 12px;
                        color: $color-primary-dark;
                        display: flex;
                        align-items: center;

                        .icon {
                            margin-right: 8px;
                            font-size: 18px;
                        }
                    }

                    .rule-list {
                        padding-left: 0;
                        margin: 0;
                        list-style: none;

                        li {
                            font-size: 14px;
                            color: $color-text-secondary;
                            line-height: 2;
                            padding: 8px 0;
                            padding-left: 36px;
                            position: relative;
                            border-bottom: 1px dashed rgba(52, 136, 206, 0.1);
                            opacity: 0;
                            transform: translateX(20px);
                            animation: slideInFromRight 0.5s ease forwards;

                            &:last-child {
                                border-bottom: none;
                            }

                            .rule-number {
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                width: 24px;
                                height: 24px;
                                background: linear-gradient(135deg, $color-primary 0%, $color-primary-light 100%);
                                color: #fff;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 12px;
                                font-weight: bold;
                                box-shadow: 0 2px 8px rgba(52, 136, 206, 0.3);
                            }
                        }
                    }
                }
            }
        }
    }

    // 2. 科室选择区
    .department-section {
        display: flex;
        height: 600px;
        border: 1px solid $color-border;
        border-radius: $radius-item;
        overflow: hidden;
        background: #fff;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);

        // 左侧导航
        .left-nav {
            width: 160px;
            background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
            border-right: 1px solid $color-border;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px;
            }
            &::-webkit-scrollbar-thumb {
                background: rgba(52, 136, 206, 0.2);
                border-radius: 2px;
            }

            ul {
                padding: 12px 8px;
                margin: 0;
            }

            li {
                height: 52px;
                display: flex;
                align-items: center;
                padding: 0 16px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 10px;
                margin-bottom: 6px;
                color: $color-text-secondary;
                font-size: 14px;
                position: relative;
                overflow: hidden;

                .nav-text {
                    position: relative;
                    z-index: 1;
                    font-weight: 500;
                }

                .nav-indicator {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%) scaleY(0);
                    width: 4px;
                    height: 60%;
                    background: linear-gradient(180deg, $color-primary 0%, $color-primary-light 100%);
                    border-radius: 0 3px 3px 0;
                    transition: transform 0.3s ease;
                }

                &:hover {
                    background: rgba(255, 255, 255, 0.9);
                    color: $color-primary;
                    transform: translateX(4px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                }

                &.active {
                    background: linear-gradient(135deg, #e8f4fc 0%, #d4edff 100%);
                    color: $color-primary;
                    font-weight: 600;
                    box-shadow: 
                        0 2px 12px rgba(52, 136, 206, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);

                    .nav-indicator {
                        transform: translateY(-50%) scaleY(1);
                    }
                }
            }
        }

        // 右侧列表
        .right-list {
            flex: 1;
            padding: 24px;
            overflow-y: auto;
            background: #fff;
            scroll-behavior: smooth;

            &::-webkit-scrollbar {
                width: 6px;
            }
            &::-webkit-scrollbar-thumb {
                background: rgba(52, 136, 206, 0.2);
                border-radius: 3px;
            }

            .department-group {
                margin-bottom: 40px;

                .group-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 2px dashed rgba(52, 136, 206, 0.15);

                    .tag {
                        background: linear-gradient(135deg, rgba(52, 136, 206, 0.1) 0%, rgba(90, 163, 224, 0.1) 100%);
                        color: $color-primary;
                        font-size: 12px;
                        padding: 4px 12px;
                        border-radius: 20px;
                        margin-right: 12px;
                        font-weight: 600;
                        border: 1px solid rgba(52, 136, 206, 0.15);
                    }

                    .name {
                        font-size: 18px;
                        font-weight: bold;
                        color: $color-text-main;
                    }
                }

                .sub-dept-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 14px;

                    li {
                        border: 1px solid $color-border;
                        border-radius: 10px;
                        height: 44px;
                        display: flex;
                        align-items: center;
                        padding: 0 14px;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        position: relative;
                        overflow: hidden;
                        background: #fff;

                        .dept-name {
                            font-size: 14px;
                            color: $color-text-secondary;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            flex: 1;
                            transition: all 0.3s ease;
                        }

                        .hover-effect {
                            position: absolute;
                            right: 10px;
                            opacity: 0;
                            transform: translateX(10px);
                            transition: all 0.3s ease;

                            .arrow {
                                color: #fff;
                                font-size: 14px;
                                font-weight: bold;
                            }
                        }

                        &:hover {
                            border-color: $color-primary;
                            background: linear-gradient(135deg, $color-primary 0%, $color-primary-light 100%);
                            box-shadow: 0 4px 16px rgba(52, 136, 206, 0.25);
                            transform: translateY(-2px);

                            .dept-name {
                                color: #fff;
                                transform: translateX(-8px);
                            }

                            .hover-effect {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                    }
                }
            }
        }
    }
}

// 规则列表项滑入动画
@keyframes slideInFromRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

// 响应式
@media (max-width: 992px) {
    .register {
        .info-section {
            flex-direction: column;
            .logo-wrapper {
                margin-bottom: 20px;
            }
        }
        
        .department-section {
            .right-list {
                .sub-dept-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        }
    }
}
</style>
