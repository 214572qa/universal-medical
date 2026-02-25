<template>
  <el-card class="hospital-card" shadow="hover" @click="goDetail">
    <div class="card-content">
      <div class="card-info">
        <div class="hospital-name">{{ hospitalInfo.hosname }}</div>
        <div class="card-meta">
          <div class="meta-item level">
            <el-icon class="icon"><View /></el-icon>
            <span class="level-tag">{{ hospitalInfo.param.hostypeString }}</span>
          </div>
          <div class="meta-item time">
            <el-icon class="icon">
                <svg t="1771918867218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5544" width="16" height="16"><path d="M291.5 923.3L260 903.5c-11.9-7.5-15.6-23.1-8.3-34.9l40.4-43.8c7.4-11.8 23-15.3 35-7.9l12.9 8c11.9 7.5 15.6 23.1 8.3 34.9l-21.7 55.5c-7.5 11.9-23.2 15.4-35.1 8z" fill="#1296db" p-id="5545"></path><path d="M305 935c-6.2 0-12.3-1.7-17.7-5.1l-31.5-19.7c-15.6-9.7-20.4-30.2-10.7-45.6l41.3-45c3.8-6.3 11.2-11.5 19.8-13.5 8.6-1.9 17.5-0.4 25.1 4.3l12.9 8c15.6 9.7 20.4 30.2 10.7 45.6l-21 54.2c-5.3 8.8-12.7 14-21.3 16-2.6 0.5-5.1 0.8-7.6 0.8z m-9.4-18.4c4 2.5 8.7 3.3 13.3 2.3 4.5-1 8.4-3.8 10.9-7.7l21-54.2c5.7-9.4 3.1-20.2-5.1-25.4l-12.9-8c-4-2.5-8.8-3.3-13.3-2.3s-8.4 3.7-10.9 7.7l-41.3 45c-4.2 7-1.6 17.8 6.7 23l31.6 19.6z" fill="#1296db" p-id="5546"></path><path d="M735.5 923.3l31.5-19.7c11.9-7.5 15.6-23.1 8.3-34.9l-40.4-43.8c-7.4-11.8-23-15.3-35-7.9l-12.9 8c-11.9 7.5-15.6 23.1-8.3 34.9l21.7 55.5c7.5 11.8 23.2 15.3 35.1 7.9z" fill="#1296db" p-id="5547"></path><path d="M721.9 935c-11 0-21.8-5.5-28-15.4l-22.3-56.8c-4-6.2-5.5-15.1-3.4-23.7 2-8.6 7.3-15.9 14.8-20.6l12.9-8c7.5-4.7 16.4-6.2 25-4.3 8.7 1.9 16 7.1 20.7 14.6l39.5 42.7c10.5 16.6 5.7 37.1-9.9 46.8L739.6 930c-5.5 3.3-11.6 5-17.7 5z m-8.4-114.1c-3.3 0-6.6 0.9-9.4 2.7l-12.9 8c-4 2.5-6.8 6.4-7.9 11-1.1 4.5-0.3 9.2 2.1 13.1l22.3 56.8c4.4 6.8 15.3 9.2 23.5 4.1l31.5-19.7c8.3-5.2 10.9-16 5.8-24.1L729 830.1c-3.3-5.1-7.2-7.8-11.7-8.8-1.2-0.3-2.5-0.4-3.8-0.4zM841.8 322.5L703.4 205l5.1-6c32.4-38.2 89.7-42.9 127.9-10.5s42.9 89.8 10.5 127.9l-5.1 6.1z m-116.1-119l114 96.7c21.4-31.3 16.1-74.6-13.4-99.7-29.6-25.1-73.2-23.3-100.6 3z" fill="#1296db" p-id="5548"></path><path d="M745.8 303.1c-1.8 0-3.6-0.6-5.1-1.9-3.3-2.8-3.7-7.7-0.9-11l24.2-28.5c2.8-3.3 7.7-3.7 11-0.9 3.3 2.8 3.7 7.7 0.9 11l-24.2 28.5c-1.5 1.9-3.7 2.8-5.9 2.8zM164.9 322.5l-5.1-6c-32.4-38.2-27.7-95.6 10.5-127.9 18.5-15.7 42-23.1 66.1-21.2 24.2 2 46.1 13.3 61.8 31.7l5.1 6-138.4 117.4z m64-139.8c-17.8 0-34.8 6.2-48.5 17.8-29.6 25.1-34.9 68.3-13.4 99.7l114-96.7c-12.4-11.9-28.4-19.2-45.8-20.6-2.2-0.2-4.2-0.2-6.3-0.2z" fill="#1296db" p-id="5549"></path><path d="M265.7 308.8c-2.2 0-4.4-0.9-6-2.8l-29-34.2c-2.8-3.3-2.4-8.2 0.9-11 3.3-2.8 8.2-2.4 11 0.9l29 34.2c2.8 3.3 2.4 8.2-0.9 11-1.4 1.3-3.2 1.9-5 1.9z" fill="#1296db" p-id="5550"></path><path d="M509.4 882.6c-190.3 0-345.1-154.8-345.1-345.1s154.8-345.1 345.1-345.1 345.1 154.8 345.1 345.1-154.8 345.1-345.1 345.1z m0-674.5C327.8 208.1 180 355.9 180 537.6 180 719.2 327.8 867 509.4 867c181.7 0 329.5-147.8 329.5-329.5 0-181.6-147.8-329.4-329.5-329.4z" fill="#1296db" p-id="5551"></path><path d="M509.4 245.6c161 0 292 131 292 292s-131 292-292 292-292-131-292-292c0.1-161 131-292 292-292m0-7.8c-165.6 0-299.8 134.2-299.8 299.8 0 165.6 134.2 299.8 299.8 299.8 165.6 0 299.8-134.2 299.8-299.8 0-165.6-134.2-299.8-299.8-299.8z" fill="#1296db" p-id="5552"></path><path d="M256.5 537.6m-9.4 0a9.4 9.4 0 1 0 18.8 0 9.4 9.4 0 1 0-18.8 0Z" fill="#1296db" p-id="5553"></path><path d="M256.5 550.8c-7.3 0-13.3-6-13.3-13.3 0-7.3 6-13.3 13.3-13.3 7.3 0 13.3 6 13.3 13.3 0 7.4-6 13.3-13.3 13.3z m0-18.7c-3 0-5.5 2.5-5.5 5.5s2.4 5.4 5.5 5.4c3 0 5.5-2.4 5.5-5.4-0.1-3-2.5-5.5-5.5-5.5z" fill="#1296db" p-id="5554"></path><path d="M762.4 537.6m-9.4 0a9.4 9.4 0 1 0 18.8 0 9.4 9.4 0 1 0-18.8 0Z" fill="#1296db" p-id="5555"></path><path d="M762.4 550.8c-7.3 0-13.3-6-13.3-13.3 0-7.3 6-13.3 13.3-13.3s13.3 6 13.3 13.3c0 7.4-6 13.3-13.3 13.3z m0-18.7c-3 0-5.5 2.5-5.5 5.5s2.4 5.4 5.5 5.4c3 0 5.5-2.4 5.5-5.4 0-3-2.5-5.5-5.5-5.5z" fill="#1296db" p-id="5556"></path><path d="M509.4 790.5m-9.4 0a9.4 9.4 0 1 0 18.8 0 9.4 9.4 0 1 0-18.8 0Z" fill="#1296db" p-id="5557"></path><path d="M509.4 803.8c-7.3 0-13.3-6-13.3-13.3s6-13.3 13.3-13.3 13.3 6 13.3 13.3-5.9 13.3-13.3 13.3z m0-18.8c-3 0-5.5 2.5-5.5 5.5s2.4 5.5 5.5 5.5c3 0 5.5-2.5 5.5-5.5s-2.4-5.5-5.5-5.5z" fill="#1296db" p-id="5558"></path><path d="M509.4 284.6m-9.4 0a9.4 9.4 0 1 0 18.8 0 9.4 9.4 0 1 0-18.8 0Z" fill="#1296db" p-id="5559"></path><path d="M509.4 297.9c-7.3 0-13.3-6-13.3-13.3 0-7.3 6-13.3 13.3-13.3s13.3 6 13.3 13.3c0 7.3-5.9 13.3-13.3 13.3z m0-18.8c-3 0-5.5 2.5-5.5 5.5s2.4 5.5 5.5 5.5c3 0 5.5-2.5 5.5-5.5s-2.4-5.5-5.5-5.5z" fill="#1296db" p-id="5560"></path><path d="M379.8 356.1l153.1 213" fill="#1296db" p-id="5561"></path><path d="M532.9 573c-1.2 0-2.4-0.6-3.2-1.6l-153.2-213c-1.3-1.7-0.9-4.2 0.9-5.4 1.7-1.3 4.2-0.9 5.5 0.9l153.2 213c1.3 1.7 0.9 4.2-0.9 5.4-0.7 0.5-1.5 0.7-2.3 0.7z" fill="#1296db" p-id="5562"></path><path d="M475.1 537.6h187.4" fill="#1296db" p-id="5563"></path><path d="M662.5 545.4H475.1c-4.3 0-7.8-3.5-7.8-7.8s3.5-7.8 7.8-7.8h187.4c4.3 0 7.8 3.5 7.8 7.8s-3.5 7.8-7.8 7.8z" fill="#1296db" p-id="5564"></path><path d="M512.6 200.3v-56.2" fill="#1296db" p-id="5565"></path><path d="M512.6 208.1c-4.3 0-7.8-3.5-7.8-7.8v-56.2c0-4.3 3.5-7.8 7.8-7.8s7.8 3.5 7.8 7.8v56.2c0 4.3-3.5 7.8-7.8 7.8z" fill="#1296db" p-id="5566"></path><path d="M557.9 151.9h-90.6V98.8h90.6v53.1z m-75-15.6h59.3v-21.8h-59.3v21.8z" fill="#1296db" p-id="5567"></path></svg>
            </el-icon>
            <span>每天{{ hospitalInfo.bookingRule?.quitTime }}放号</span>
          </div>
        </div>
      </div>
      <div class="card-image">
        <el-image :src="hospitalInfo.logoData" :alt="hospitalInfo.hosname" fit="cover" lazy>
            <template #error>
                <div class="image-slot">
                    <el-icon><Picture /></el-icon>
                </div>
            </template>
        </el-image>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {  View, Picture } from '@element-plus/icons-vue';

//创建路由对象
let $router = useRouter();

//接受父组件传递过来的props-> 即为已有的医院的数据
let props = defineProps(['hospitalInfo']);

//点击某一个推荐项
const goDetail = () => {
  //点击推荐项目进入医院详情页面，将来需要携带query参数（医院的编码）
  $router.push({
    path: '/hospital/register',
    query: {
        hoscode: props.hospitalInfo.hoscode
    }
  })
}
</script>

<style scoped lang="scss">
.hospital-card {
  border-radius: $radius-lg;
  border: 1px solid $color-border;
  background: $color-bg-card;
  transition: all 0.35s ease;
  cursor: pointer;
  overflow: hidden;
  
  ::v-deep(.el-card__body) {
    padding: 0;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
    border-color: $color-primary-light;
    
    .hospital-name {
      color: $color-primary;
    }
  }
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  gap: 20px;
}

.card-image {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  
  .el-image {
    width: 100%;
    height: 100%;
    border-radius: $radius-md;
    box-shadow: $shadow-sm;
    transition: transform $transition-base;
  }
}

.card-info {
  flex: 1;
  min-width: 0;
  
  .hospital-name {
    font-size: 18px;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: 12px;
    transition: color $transition-base;
    line-height: 1.4;
    @include text-truncate;
  }
}

.card-meta {
  color: $color-text-muted;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .icon {
      flex-shrink: 0;
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: $color-text-secondary;
    }
    
    span {
      @include text-truncate;
    }

    &.level {
      color: $color-text-secondary;
      font-weight: 500;
      
      .level-tag {
        background: $color-primary-light;
        color: $color-primary;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
      }
    }

    &.time {
      color: $color-text-muted;
      span {
        color: $color-text-secondary;
      }
    }
  }
}
</style>
