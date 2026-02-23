<template>
    <!-- 展示全部订单的结构 -->
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>挂号订单</span>
            </div>
        </template>
        <!-- 提供用户选择的下拉菜单 -->
        <el-form>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="就诊人">
                        <el-select v-model="patientId" placeholder="请选择就诊人" style="width: 100%;"
                            @change="changeUser">
                            <el-option label="全部就诊人" value=""></el-option>
                            <el-option v-for="item in allUser" :key="item.id" :label="item.name"
                                :value="String(item.id)"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单状态">
                        <el-select v-model="orderStatus" placeholder="请选择订单状态" style="width: 100%;"
                            @change="changeOrderStatus">
                            <el-option label="全部订单" value=""></el-option>
                            <el-option v-for="item in allOrderState" :key="item.status" :label="item.comment"
                                :value="String(item.status)"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- 表格展示订单的数据 -->
        <el-table border style="width: 100%;margin: 10px 0;" :data="allOrderStatus">
            <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
            <el-table-column label="医院" prop="hosname"></el-table-column>
            <el-table-column label="科室" prop="depname"></el-table-column>
            <el-table-column label="医生" prop="title"></el-table-column>
            <el-table-column label="医师服务费" prop="amount"></el-table-column>
            <el-table-column label="就诊人" prop="patientName"></el-table-column>
            <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
            <el-table-column label="操作">
                <template #="{ row }">
                    <el-button type="text" @click="goDetail(row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
            :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
            @current-change="getOrderInfo" @size-change="handler" />
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
//引入获取订单的请求的方法
import { reqUserOrderInfo, reqAllUser, reqOrderState } from '@/api/user';
import { useRouter } from 'vue-router';
//引入订单数据的ts类型
import type { AllOrderStateResponseData, AllUserResponseData, AllOrderState, AllUser, Records, UserOrderInfoResponseData } from '@/api/user/type';
//引入路由器
const router = useRouter();
// 分页器当前页码，初始值为1
let pageNo = ref(1);
// 分页器每页显示条数，初始值为10
let pageSize = ref(10);
//搜集就诊人的ID
let patientId = ref<string>('');
//搜集订单状态
let orderStatus = ref<string>('');
//存储全部的订单
let allOrderStatus = ref<Records>([]);
//存储订单的总个数
let total = ref<number>(0);
//存储全部就诊人的信息
let allUser = ref<AllUser>([]);
//存储全部订单状态
let allOrderState = ref<AllOrderState>([]);

//组件挂载完毕的钩子
onMounted(() => {
    // 调用获取订单数据的方法
    getOrderInfo();
    //获取全部就诊人信息，以及获取全部订单的状态
    getData();
});

//获取订单数据的方法
const getOrderInfo = async (pager: number = 1) => {
    pageNo.value = pager; // pager 是分页器的当前页码
    let result: UserOrderInfoResponseData = await reqUserOrderInfo(pageNo.value, pageSize.value, patientId.value, orderStatus.value);
    if (result.code == 200) {
        allOrderStatus.value = result.data.records;
        total.value = result.data.total;
    }
};

//跳转详情页面的方法
const goDetail = (row: any) => {
    router.push({ path: '/user/order', query: { orderId: row.id } });
};
//下拉菜单事件的回调
const handler = (pageSizes: number) => {
    pageSize.value = pageSizes;
    getOrderInfo(1); // 重置为第1页
};
//获取就诊人与订单状态的接口返回的结果的回调
const getData = async () => {
    // 获取全部就诊人信息
    const result1: AllUserResponseData = await reqAllUser();
    // 获取全部订单状态
    const result2: AllOrderStateResponseData = await reqOrderState();

    if (result1.code == 200 && result2.code == 200) {
        allUser.value = result1.data;
        allOrderState.value = result2.data;
    }
};

//就诊人下拉菜单事件的回调
const changeUser = () => {
    getOrderInfo(1);
};
//订单状态下拉菜单事件的回调
const changeOrderStatus = () => {
    getOrderInfo(1);
};
</script>

<style scoped></style>