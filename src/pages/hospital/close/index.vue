<template>
    <div class="info">
        <h1>{{hospitalStore.hospitalInfo.hospital?.hosname}}停诊信息</h1>
        <el-empty description="暂无停诊信息" />
    </div>
</template>

<script setup lang="ts">
//获取医院详情数据进行展示
import useDetailStore from '@/store/modules/hospitalDetail';
//获取仓库对象
let hospitalStore = useDetailStore();
</script>

<style scoped lang="scss">
.info{
   h1{
    text-align: center;
    font-size: 30px;
   }
}
</style>