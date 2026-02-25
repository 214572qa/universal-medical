<template>
  <div class="level-filter">
    <div class="filter-header">医院等级</div>
    <div class="filter-content">
      <div class="filter-label">等级：</div>
      <ul class="level-list">
        <li class="level-item" :class="{active:activeLevel === ''}" @click="changeLevel('')">全部</li>
        <li 
          class="level-item" 
          v-for="level in levelList" 
          :key="level.value" 
          :class="{active:activeLevel === level.value}" 
          @click="changeLevel(level.value)"
        >
          {{level.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入数据接口
import { reqHospitalLevelAndRegion } from '@/api/home';
import { onMounted, ref } from 'vue';
import type { HospitalLevelAndRegionArr, HospitalLevelAndRegionResponseData } from '@/api/home/type';

//控制医院等级高亮响应式数据
let activeLevel = ref<string>('');
//定义一个数组用于存储医院等级数据
const levelList = ref<HospitalLevelAndRegionArr>([]);

//组件挂载完毕
onMounted(() => {
   getLevelData();
})

//获取医院等级数据
const getLevelData = async() => {
    const result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion('HosType');
    if (result.code === 200) {
        levelList.value = result.data;
    }
}

//点击点击的铵钮回调
const emit = defineEmits(['getLevel']);
const changeLevel = (level: string) => {
    activeLevel.value = level;
    emit('getLevel', level);
}
</script>

<script lang="ts">
    export default {
        name: 'Level'
    }
</script>

<style scoped lang="scss">
.level-filter {
  color: $color-text-secondary;
}

.filter-header {
  font-weight: 700;
  margin: 0 0 16px 0;
  font-size: 18px;
  color: $color-text-primary;
  letter-spacing: -0.3px;
}

.filter-content {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: $color-text-secondary;
  flex-shrink: 0;
  padding-top: 8px;
}

.level-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.level-item {
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
  
  &.active {
    color: white;
    background: $color-primary;
    box-shadow: $shadow-sm;
  }
}
</style>
