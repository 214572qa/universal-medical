<template>
  <div class="region-filter">
    <div class="filter-label">地区：</div>
    <ul class="region-list">
      <li class="region-item" :class="{'is-active': activeRegion === ''}" @click="changeRegion('')">全部</li>
      <li 
        class="region-item"
        v-for="region in regionList" 
        :key="region.value" 
        :class="{'is-active': activeRegion === region.value}"
        @click="changeRegion(region.value)"
      >
        {{region.name}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/home/type';

// 定义地区的高亮
let activeRegion = ref<string>('');
// 定义地区数组
let regionList = ref<HospitalLevelAndRegionArr>([]);

// 组件挂载时调用获取地区数据
onMounted(() => {
    getRegionData();
})

// 定义获取地区数据的函数
const getRegionData = async () => {
    const result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('Guangzhou');
    if (result.code === 200) {
        regionList.value = result.data
    }
}

// 定义地区切换函数
const emit = defineEmits(['getRegion']);
const changeRegion = (region: string) => {
    activeRegion.value = region;
    emit('getRegion', region);
}
</script>

<style scoped lang="scss">
.region-filter {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  margin-top: $spacing-md;
  padding-top: $spacing-md;
  border-top: 1px solid $color-border;
  color: $color-text-secondary;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: $color-text-secondary;
  flex-shrink: 0;
  padding-top: 8px;
  white-space: nowrap;
}

.region-list {
  display: flex; 
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.region-item {
  padding: 6px 16px;
  font-size: 14px;
  color: $color-text-secondary;
  background: transparent;
  border-radius: $radius-full;
  cursor: pointer;
  transition: all $transition-base;
  border: 1px solid transparent;
  font-weight: 500;
  
  &:hover {
    color: $color-primary;
    background: $color-primary-light;
  }
  
  &.is-active {
    color: white;
    background: $color-primary;
    box-shadow: $shadow-sm;
  }
}
</style>
