<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul>
                <li :class="{'active': RegionFlag === ''}" @click="changeRegion('')" >全部</li>
                <li v-for="region in regionArr" :key="region.id" @click="changeRegion(region.value)" :class="{'active': RegionFlag === region.value}">{{region.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/home/type';

// 定义地区的高亮
let RegionFlag = ref<string>('');
// 定义地区数组
let regionArr = ref<HospitalLevelAndRegionArr>([]);
// 组件挂载时调用获取地区数据
onMounted(() => {
    getRegion();
})
// 定义获取地区数据的函数
const getRegion = async () => {
    const result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion(
        'Beijin'
    );
    //存储地区数据
    if (result.code === 200) {
        regionArr.value = result.data
    }
}

// 定义地区切换函数：点击时触发，返回对应参数
const changeRegion = (region: string) => {
    RegionFlag.value = region;
    // 触发自定义事件：将地区参数传递给父组件
    $emit('getRegion', region);
}

let $emit = defineEmits(['getRegion']);
</script>

<style scoped lang="scss">
.region{
    display: flex;
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 68px;
        }
        ul{
            display: flex; 
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
                   color: #55a6fe;
                }
            }

            li:hover{
                color: #55a6fe;
            }
        }
    }
}
</style>