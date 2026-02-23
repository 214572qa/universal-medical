<template>
    <div class="container">
        <div class="tip">确认挂号信息</div>
        <!-- 卡片:展示就诊人信息 -->
        <el-card class="box-card">
            <!-- 卡片的头部 -->
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button type="primary" @click="goUser" :icon="User">添加就诊人</el-button>
                </div>
            </template>
            <!-- 卡片的身体：就诊人信息 -->
            <div class="user">
                <Visitor @click="currentIndex = index" :index="index" :currentIndex="currentIndex"
                    v-for="(user, index) in userArr" :key="user.id" :user="user" class="item" />
            </div>
        </el-card>
        <!-- 卡片：展示医生信息 -->
        <el-card>
            <!-- 卡片的头部 -->
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 卡片的身体：展示医生信息 -->
            <el-descriptions class="margin-top" title="With border" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊日期：</div>
                    </template>
                    {{ docInfo?.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊医院：</div>
                    </template>
                    {{ docInfo?.param.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">就诊科室：</div>
                    </template>
                    {{ docInfo?.param.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生姓名：</div>
                    </template>
                    {{ docInfo?.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生职称：</div>
                    </template>
                    {{ docInfo?.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医生专长：</div>
                    </template>
                    {{ docInfo?.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">医务服务费：</div>
                    </template>
                    <span style="color: red;">{{ docInfo?.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 确认挂号按钮 -->
        <div class="btn">
            <el-button type="primary" :disabled="currentIndex == -1 ? true : false"
                @click="submitOrder">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入就诊人组件

import { User } from '@element-plus/icons-vue'
//引入获取就诊人信息的接口
import { reqGetUser, reqDoctorInfo } from '@/api/hospital'
import { reqSubmitOrder } from '@/api/user';
import type { SubmitOrder } from '@/api/user/type';
import { onMounted, ref } from 'vue';
import { type DoctorInfoData, type UserResponseData, type UserArr, type Doctor } from '@/api/hospital/type';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
//获取路由对象
let $route = useRoute();
//获取路由器
let $router = useRouter();
//存储挂号医生信息
let docInfo = ref<Doctor>();

//存储就诊人信息
let currentIndex = ref<number>(-1);
//存储全部就诊人信息
let userArr = ref<UserArr>([]);
//组件挂载完毕获取相应的数据
onMounted(() => {
    //获取就诊人信息
    fetchUserData();
    //获取挂号医生信息
    fetchInfo();
})
//获取就诊人信息
const fetchUserData = async () => {
    //获取就诊人信息
    let result: UserResponseData = await reqGetUser();
    if (result.code == 200) {
        userArr.value = result.data;
    }
}
//获取挂号医生信息
const fetchInfo = async () => {
    let result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string);
    if (result.code == 200) {
        docInfo.value = result.data;
    }
}

//确认挂号按钮的回调
const submitOrder = async (index: number) => {
    //医院的编号
    let hoscode = docInfo.value?.hoscode as string;
    //医生的排班ID
    let scheduleId = docInfo.value?.id as string;
    //就诊人的ID
    let patientId = userArr.value[currentIndex.value]?.id || '';
    //提交订单
    let result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId);
    //提交订单成功
    if (result.code == 200) {
        console.log('准备跳转到订单页面，orderId:', result.data);
        $router.push({ path: '/user/order', query: { orderId: result.data } });
    } else {
        ElMessage({
            type: 'error',
            message: result.message
        });
    }
}

//预约挂号添加就诊人按钮的方法
const goUser = () => {
    //跳转到添加就诊人页面
    $router.push({ path: '/user/patient', query: {type:'add' } });
}

</script>

<style scoped lang="scss">
.container {
    .tip {
        font-weight: 900;
        font-size: 20px;
        color: #333;
    }

    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 32%;
                margin: 5px;
            }

        }
    }

    .btn {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }
}
</style>