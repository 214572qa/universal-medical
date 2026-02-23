<template>
    <div class="register">
        <div class="top">
           <div class="title">{{ hospitalStore.hospitalInfo.hospital?.hosname}}</div> 
           <div class="level">
               <svg t="1768384655497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3228" width="16" height="16"><path d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z" fill="#d81e06" p-id="3229"></path><path d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z" fill="#d81e06" p-id="3230"></path><path d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z" fill="#d81e06" p-id="3231"></path></svg>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <!-- 展示内容区 -->
         <div class="content">
            <div class="left">
                <img :src="hospitalStore.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <div>挂号规则</div>
                <div class="time">
                    预约周期：10天 放号时间：{{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }} 停挂时间：{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}
                </div>
                <div class="address">
                    具体位置：{{ hospitalStore.hospitalInfo.hospital?.address }}
                </div>
                <div class="router">
                    具体的路线：{{ hospitalStore.hospitalInfo.hospital?.route }}
                </div>
                <div class="releaestime">
                    退号时间：就诊前一个工作日{{ hospitalStore.hospitalInfo.bookingRule?.quitTime }}前取消
                </div>
                <div class="rule">
                    预约挂号规则：
                </div>
                <div class="ruleInfo" v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule" :key="index">
                    {{ item }}
                </div>
            </div>
         </div>
         <!-- 放置每一个医院科室的数据 -->
          <div class="deparment">
            <div class="leftNav">
                <ul>
                    <li @click="changeIndex(index)" :class="{'active':index === currentIndex}" v-for="(deparment, index) in hospitalStore.deparmentArr" :key="deparment.depcode">
                        {{ deparment.depname }}
                    </li>
                </ul>
            </div>
            <div class="deparmentInfo">
               <!-- 用一个div:代表一个大的科室和小科室 -->
                <div class="showDeparment" v-for="(deparment) in hospitalStore.deparmentArr" :key="deparment.depcode">
                    <h1 class="cur">{{ deparment.depname }}</h1>
                    <ul>
                        <li @click="showLogin(item)" v-for="(item) in deparment.children" :key="item.depcode">{{ item.depname }}</li>
                    </ul>
                </div>
            </div>
          </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
//引入用户登录/注册仓库的数据
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
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

//点击科室切换高亮的函数
const changeIndex = (index: number) => {
    currentIndex.value = index;
    
    // 使用 nextTick 确保 DOM 更新后再执行滚动
    nextTick(() => {
        //点击导航获取右侧科室（大的科室H1标题）
        const allH1 = document.querySelectorAll('.cur');
        const targetIndex = currentIndex.value;
        
        //滚动到对应科室的位置
        if (targetIndex !== undefined && allH1[targetIndex]) {
            const targetElement = allH1[targetIndex] as HTMLElement;
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
.register{
    .top{
        display: flex;
        .title{
            font-size: 30px;
            font-weight: 900;
        }
        .level{
            color: #7f7f7f;
            margin-left: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            span{
                margin-left: 5px;
            }
        }
    }
    .content{
        display: flex;
        .left{
           width: 80px;
           margin-top: 20px;
           img{
               width: 80px;
               height: 80px;
               border-radius: 50%;
           }
        }
        .right{
            flex: 1;
            font-size: 12px;
            margin-left: 20px;
            .time,.address,.router,.releaestime,.ruleInfo{
                margin-top: 10px;
                color: #7f7f7f;
            }
            .rule{
                margin: 10px 0px;
            }
        }
    }

    .deparment{
        width: 100%;
        height: 570px;
        display: flex;
        margin-top: 30px;
        .leftNav{
            width: 80px;
            height: 100%;
            ul{
                width: 100%;
                height: 100%;
                background: rgb(248, 248, 248);
                display: flex;
                flex-direction: column;
                li{
                 flex: 1;
                 align-items: center;
                 color: #7f7f7f;
                 font-size: 14px;
                 line-height: 40px;
                 &.active{
                    border-left: 1px solid red;
                    color: red;
                    background: #fff;
                 }
                }
            }
        }
        .deparmentInfo{
            flex: 1;
            margin-left: 20px;
            height: 100%;
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
            .showDeparment{
                h1{
                    background-color: rgb(248, 248, 248);
                    color: #7f7f7f;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        color: #7f7f7f;
                        width: 33.33%;
                        line-height: 30px;
                    }
                }
            }
        }
    }
}
</style>