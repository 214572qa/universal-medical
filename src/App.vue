<template>
  <div class="container">
    <!-- 引入医院顶部组件 -->
    <HospitalTop />

    <div class="content">
      <!-- 引入路由出口组件 -->
      <router-view></router-view>
    </div>

    <!-- 引入医院底部组件 -->
    <HospitalBottom />
    <!-- 引入登录组件 -->
    <Login v-if="userStore.visible" />
  </div>
</template>

<script setup lang="ts">
import useUserStore from './store/modules/user'
let userStore = useUserStore();
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    
    .content{
      margin-top: 70px; // 顶部导航高度
      width: 100%; // 全屏宽度
      min-height: 700px;
    }
  }
</style>
