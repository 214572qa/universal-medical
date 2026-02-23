<template>
    <div>
        <!-- 首页轮播图的结构 -->
        <el-carousel :interval="2000"  height="350px" >
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../../assets/web-banner1.png" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
img{
    height: 350px;
    width: 100%;
}
</style>