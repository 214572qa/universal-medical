<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">{{workData.baseMap?.hosname}}</div>
            <div class="line"></div>
            <div>{{workData.baseMap?.bigname}}</div>
            <div class="dot">.</div>
            <div class="hosdeparment">{{workData.baseMap?.depname}}</div>
        </div>
        <!-- 中间展示日期的结构 -->
        <div class="center">
            <h1 class="time">{{workData.baseMap?.workDateString}}</h1>
            <div class="container">
                <div class="item" :class="{ active: item.status === -1 || item.availableNumber === -1, cur: item.workDate === workTime?.workDate }"
                    v-for="item in workData.bookingScheduleList"
                    :key="item"
                    @click="changeTime(item)"
                    >
                    <div class="top1">{{item.workData}}-{{ item.dayOfWeek}}</div>
                    <div class="bottom">
                        <div v-if="item.status === -1">停止挂号</div>
                        <div v-if="item.status === 0">
                            {{ item.availableNumber==-1?'约满了' :'有号('+item.availableNumber+')'}}
                        </div>
                        <div v-if="item.status === 1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" layout="prev, pager, next" :total="50" @current-change="fetchWorkData"/>
        </div>

        <!-- 底部展示相应的医生的结构 -->
        <div class="bottom">
            <!-- 展示即将放号的时间 -->
            <div class="will" v-if="workTime?.status==1">
                <span class="time">{{ releaseTimeDisplay }}</span>
                <span class="willText">放号</span>
            </div>
            <!-- 展示医生的结构：上午、下午 -->
            <div class="doctor" v-else>
                <!-- 展示上午 -->
                <div class="moring">
                    <!-- 顶部文字提示 -->
                    <div class="tip">
                        <svg t="1770383552646" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5561" width="32" height="32">
                            <path
                                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                                fill="#1296db" p-id="5562"></path>
                        </svg>
                        <span class="text">上午号源</span>
                    </div>
                    <!-- 每一个医生的信息 -->
                    <div class="doc_info" v-for="doctor in moringArr" :key="doctor.id">
                        <!-- 展示医生的名字|技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">
                                {{ doctor.skill }}
                            </div>
                        </div>
                        <!-- 展示挂号的钱数 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" size="default" @click="goStep2(doctor)">{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>

                </div>
                <!-- 展示下午 -->
                <div class="after">
                    <!-- 顶部文字提示 -->
                    <div class="tip">
                        <svg t="1770385643978" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7421" width="32" height="32">
                            <path d="M490.666667 593.325253h41.890909v131.361616H490.666667z" fill="#1296db"
                                p-id="7422"></path>
                            <path
                                d="M114.424242 310.044444h151.402021v46.416162H114.424242zM767.094949 309.39798H909.575758v46.286868H767.094949z"
                                fill="#1296db" p-id="7423"></path>
                            <path
                                d="M315.086869 500.622222l29.220202 29.99596-94.125253 91.668687-29.220202-29.99596 94.125253-91.668687z m0 0M711.111111 499.329293l99.555556 101.753535L777.69697 633.535354l-99.555556-101.753536 32.969697-32.452525z m0 0M490.666667 593.325253h41.890909v131.361616H490.666667zM132.266667 315.733333h133.559596v40.856566H132.266667zM767.094949 315.216162h124.509091v40.468686h-124.509091zM316.89697 302.545455c-1.551515 9.826263-2.19798 19.781818-2.19798 29.995959 0 110.286869 89.858586 200.274747 200.274747 200.274748 110.157576 0 200.145455-89.987879 200.145455-200.274748 0-10.214141-0.775758-20.29899-2.327273-29.995959H316.89697z m0 0"
                                fill="#1296db" p-id="7424"></path>
                        </svg>
                        <span class="text">下午号源</span>
                    </div>
                    <!-- 每一个医生的信息 -->
                    <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
                        <!-- 展示医生的名字|技能 -->
                        <div class="left">
                            <div class="info">
                                <span>{{ doctor.title }}</span>
                                <span>|</span>
                                <span>{{ doctor.docname }}</span>
                            </div>
                            <div class="skill">
                                {{ doctor.skill }}
                            </div>
                        </div>
                        <!-- 展示挂号的钱数 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" size="default" @click="goStep2(doctor)">{{ doctor.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital';
import { useRoute, useRouter } from 'vue-router';
import type { Doctor, HospitalWorkData, DoctorResponseData, DocArr } from '@/api/hospital/type';
import { useDebounce } from '@/utils/composables/useRequest';

// 获取路由对象
const $route = useRoute();
// 获取全局路由器对象
const $router = useRouter();

// 分页配置
const limit = ref<number>(6);
const pageNo = ref<number>(1);

// 存储医院科室挂号的数据
const workData = ref<{
    baseMap: {
        hosname?: string;
        bigname?: string;
        depname?: string;
        workDateString?: string;
        releaseTime?: string;
        stopTime?: string;
    };
    bookingScheduleList: any[];
}>({
    baseMap: {},
    bookingScheduleList: []
});

// 存储排班日期：当前选中的日期
const workTime = ref<any>();
// 存储排班医生的数据
const docArr = ref<DocArr>([]);
// 加载状态
const doctorLoading = ref<boolean>(false);

// 计算放号时间显示（修复硬编码问题）
const releaseTimeDisplay = computed(() => {
    if (!workTime.value || !workData.value.baseMap.releaseTime) {
        return '即将放号';
    }
    const workDate = workTime.value.workDate;
    const releaseTime = workData.value.baseMap.releaseTime || '08:30';
    
    // 格式化日期显示
    if (workDate) {
        const date = new Date(workDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日 ${releaseTime}`;
    }
    return releaseTime;
});

// 组件挂载完毕发一次请求
onMounted(() => {
    fetchWorkData();
});

// 获取挂号的数据
const fetchWorkData = async () => {
    const hoscode = $route.query.hoscode as string;
    const depcode = $route.query.depcode as string;
    
    if (!hoscode || !depcode) {
        console.warn('缺少必要参数：hoscode或depcode');
        return;
    }
    
    const result: HospitalWorkData = await reqHospitalWork(
        pageNo.value,
        limit.value,
        hoscode,
        depcode
    );
    
    if (result.code === 200) {
        workData.value = result.data;
        // 存储第一天日期的数据
        workTime.value = workData.value.bookingScheduleList[0];
        // 获取一次医生的数据
        getDoctorData();
    }
};

// 获取医生某一天排班数据（原始函数）
const _getDoctorData = async () => {
    const hoscode = $route.query.hoscode as string;
    const depcode = $route.query.depcode as string;
    const workDate = workTime.value?.workDate;
    
    if (!hoscode || !depcode || !workDate) {
        return;
    }
    
    doctorLoading.value = true;
    try {
        const result: DoctorResponseData = await reqHospitalDoctor(hoscode, depcode, workDate);
        if (result.code === 200) {
            docArr.value = result.data;
        }
    } finally {
        doctorLoading.value = false;
    }
};

// 使用防抖包装医生数据请求（防止快速切换日期时的重复请求）
const getDoctorData = useDebounce(_getDoctorData, 300);

// 计算出上午排班的医生数据
const moringArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => doc.workTime === 0);
});

// 计算出下午排班的医生数据
const afterArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => doc.workTime === 1);
});

// 点击切换日期（添加状态检查）
const changeTime = (item: any) => {
    // 如果点击的是不可选状态，直接返回
    if (item.status === -1 || item.availableNumber === -1) {
        return;
    }
    // 更新存储的工作日期
    workTime.value = item;
    // 重新获取医生排班数据（已防抖）
    getDoctorData();
}

//路由跳转进入到选择就诊人的页面
const goStep2 = (doctor: Doctor) => {
    //编程式导航进行路由的跳转，且携带医生的ID
    $router.push({
        path: '/hospital/register_step2',
        query: {
            docId: doctor.id
        }
    })
}
</script>

<style scoped lang="scss">
    .wrap {
        .top {
            display: flex;
            align-items: center;
            color: #7f7f7f;
            font-size: 14px;
            .line{
                width: 5px;
                height: 20px;
                background: skyblue;
                margin: 0 5px;
            }
            .dot{
                margin: 0 5px;
                color: skyblue;
            }
        }
        .center {
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            .time {
                font-weight: 900;
                font-size: 15px;
            }
            .container {
                width: 100%;
                display: flex;
                margin: 30px 0;
                .item {
                    flex: 1;
                    border: 1px solid skyblue;
                    margin: 0 5px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    &:hover:not(.active) {
                        transform: translateY(-3px);
                        box-shadow: 0 4px 12px rgba(135, 206, 235, 0.3);
                    }
                    &.active {
                        border: 1px solid #ccc;
                        color: #999;
                        cursor: not-allowed;
                        .top1{
                            background: #ccc;
                        }
                    }
                    &.cur {
                        transform: scale(1.08);
                        box-shadow: 0 6px 16px rgba(18, 150, 219, 0.4);
                        border-color: #1296db;
                        font-weight: 600;
                        .top1{
                            background: linear-gradient(135deg, #1296db 0%, #5cb3e0 100%);
                            color: white;
                        }
                    }
                    .top1{
                        background: #e8f2ff;
                        height: 30px;
                        width: 100%;
                        text-align: center;
                        line-height: 30px;
                        transition: all 0.3s ease;
                    }
                    .bottom{
                        height: 60px;
                        width: 100%;
                        text-align: center;
                        line-height: 60px;
                    }
                }
            }
        }
        .bottom {
            .will {
                text-align: center;
                font-size: 30px;
                font-weight: 900;
                .time{
                    color: red;
                }
                .willText{
                    color: yellowgreen;
                }
            }
            .doctor {
                .moring,.after{
                    .tip{
                        display: flex;
                        align-items: center;
                        .text {
                            color: #7f7f7f;
                            font-weight: 900;
                        }
                    }
                    .doc_info{
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;
                        border-bottom: 1px solid #ccc;
                        .left{
                            .info{
                                color: skyblue;
                                margin: 10px 0;
                                span{
                                    margin: 0 5px;
                                    font-size: 18px;
                                    font-weight: 900;
                                }
                            }
                            .skill{
                                margin: 10px 0;
                                color: #7f7f7f;
                            }
                        }
                        .right{
                            display: flex;
                            width: 150px;
                            align-items: center;
                            justify-content: space-between;
                            .money {
                                color: #7f7f7f;
                                font-weight: 900;
                            }
                        }
                    }
                }
            }
        }
    }

</style>