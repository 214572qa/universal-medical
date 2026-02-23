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
    align-items: center;
    .content{
      margin:0 auto;
      margin-top: 80px;
      width: 1200px;
      min-height: 700px;
      justify-content: center;
        
    }
  }
</style>
