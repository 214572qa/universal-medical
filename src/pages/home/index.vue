<template>
    <div>
        <!-- 引入轮播图组件 -->
        <Carousel />
        <!-- 首页搜索医院的表单区域 -->
        <Search />
        <!-- 底部展示医院的结构 -->
        <el-row :gutter = "20">
            <el-col :span = "20">
                <!-- 引入首页等级组件 -->
                <Level @getLevel="getLevel"/>
                <!-- 引入首页地区组件 -->
                <region @getRegion="getRegion"/>
                <!-- 展示医院结构的卡片组件 -->
                <div class="hospital"  v-show="hasHospitalArr.length > 0">
                    <card class="item" 
                        v-for="(item,index) in hasHospitalArr" 
                        :key="item.id || index" 
                        :hospitalInfo="item"
                    />
                </div>
                 <el-empty
                    v-show="hasHospitalArr.length === 0"
                    image="https://th.bing.com/th/id/OIP.yR0KGQRvObIsRTiXNo-dIAHaEK?w=322&h=181&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" 
                    description="暂无医院信息"
                    :image-size="800"
                />
                <!-- 分页器 -->
                <el-pagination 
                    v-model:current-page="pageNo" 
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]" 
                    :background="true"
                    layout="prev, pager, next, jumper, sizes, total"
                    :total = "total"
                    @current-change="currentChange"
                    @size-change="sizeChange"
                />
                
            </el-col>
            <el-col :span = "4">
                <!-- 引入提示组件 -->
                <Tip />
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { reqHospitalList } from '@/api/home';
import { useDebounce } from '@/composables/useRequest';
// 引入提示组件
import Tip from './tip/index.vue';
// 引入接口类型
import type { Content, HospitalResponseData } from '@/api/home/type';
// 引入轮播图的组件
import Carousel from './carousel/index.vue';
// 引入搜索组件
import Search from './search/index.vue';
// 引入首页等级组件
import Level from './level/index.vue';
// 引入首页地区组件
import region from './region/index.vue';
import card from './card/index.vue';

// 分页器当前的页码
const pageNo = ref<number>(1);
// 分页器每页展示条数
const pageSize = ref<number>(10);
// 存储已有的医院数据
const hasHospitalArr = ref<Content>([]);
// 存储医院数据的总数
const total = ref<number>(0);
// 存储医院的等级参数
const hostype = ref<string>('');
// 存储选择医院的地区
const districtCode = ref<string>('');
// 加载状态
const loading = ref<boolean>(false);

onMounted(() => {
    getHospitalList();
});

// 获取已有的医院的数据（原始函数）
const _getHospitalList = async () => {
    loading.value = true;
    try {
        const result: HospitalResponseData = await reqHospitalList(
            pageNo.value,
            pageSize.value,
            hostype.value,
            districtCode.value
        );
        
        if (result.code === 200) {
            hasHospitalArr.value = result.data.content;
            total.value = result.data.totalElements;
        }
    } finally {
        loading.value = false;
    }
};

// 使用防抖包装请求函数（300ms防抖，避免筛选条件快速切换时的重复请求）
const getHospitalList = useDebounce(_getHospitalList, 300);

// 监听筛选变化（优化：只监听筛选条件，不监听分页参数）
// 分页参数通过事件回调处理，避免重复请求
watch(
    [hostype, districtCode],
    () => {
        // 筛选条件变化时重置到第一页
        pageNo.value = 1;
        getHospitalList();
    },
    { flush: 'post' } // 确保在DOM更新后执行
);

// 分页器切换页码时触发的函数
const currentChange = (page: number) => {
    pageNo.value = page;
    // 直接调用原始函数，分页切换不需要防抖
    _getHospitalList();
};

// 分页器切换每页展示条数时触发的函数
const sizeChange = (size: number) => {
    pageSize.value = size;
    pageNo.value = 1;
    // 直接调用原始函数，分页切换不需要防抖
    _getHospitalList();
};

// 子组件的自定义事件：获取等级参数
const getLevel = (level: string) => {
    hostype.value = level;
    // 不需要手动调用getHospitalList，watch会自动触发
};

// 子组件的自定义事件：获取地区参数
const getRegion = (region: string) => {
    districtCode.value = region;
    // 不需要手动调用getHospitalList，watch会自动触发
};
</script>

<style scoped lang="scss">
.hospital{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item{
        width: 48%;
        margin: 10px 0px;
    }
}
</style>
