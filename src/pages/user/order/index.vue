<template>
    <div>
        <div v-if="$route.query.orderId">
            <Detail />
        </div>
        <div v-else>
            <AllOrder />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// 引入子组件
import AllOrder from './allOrder/index.vue'
import Detail from './detail/index.vue'
// 创建路由对象，用于获取路由参数
let $route = useRoute();

</script>

<style scoped></style>