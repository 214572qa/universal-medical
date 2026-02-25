<template>
  <div class="home-page">
    <!-- 顶部轮播 (Hero Section) -->
    <div class="hero-wrapper">
      <Carousel />
    </div>

    <!-- 搜索区 -->
    <div class="search-section">
      <div class="search-container">
        <Search />
      </div>
    </div>

    <!-- 主体内容区 -->
    <div class="main-content">
      <div class="container">
        <el-row :gutter="32">
          <!-- 左侧：筛选与列表 -->
          <el-col :span="19">
            <!-- 筛选区 -->
            <div class="filter-section">
              <div class="filter-title">医院筛选</div>
              <div class="filter-group">
                <Level @getLevel="getLevel" />
              </div>
              <div class="filter-group">
                <Region @getRegion="getRegion" />
              </div>
            </div>

            <!-- 医院列表 -->
            <div class="hospital-list" v-if="hospitalArr.length > 0">
              <div class="list-grid">
                <Card class="item" v-for="(item, index) in hospitalArr" :key="index" :hospitalInfo="item" />
              </div>
            </div>
            <!-- 骨架屏：当没有数据且加载时显示，或者单纯加载时显示 -->
            <div class="hospital-list" v-else-if="loading">
              <div class="list-grid">
                <el-card v-for="i in 6" :key="i" class="item" shadow="hover">
                  <el-skeleton animated>
                    <template #template>
                      <div style="display: flex; gap: 16px;">
                        <el-skeleton-item variant="image" style="width: 80px; height: 80px; border-radius: 50%" />
                        <div style="flex: 1">
                          <el-skeleton-item variant="h3" style="width: 50%; margin-bottom: 10px;" />
                          <el-skeleton-item variant="text" style="width: 80%" />
                          <el-skeleton-item variant="text" style="width: 60%; margin-top: 8px;" />
                        </div>
                      </div>
                    </template>
                  </el-skeleton>
                </el-card>
              </div>
            </div>
            <el-empty v-else description="暂无符合条件的医院" :image-size="200"></el-empty>

            <!-- 分页器 -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total"
                :total="total"
                @current-change="changePageNo"
                @size-change="sizeChange"
              />
            </div>
          </el-col>

          <!-- 右侧：侧边栏 -->
          <el-col :span="5">
            <div class="sidebar-wrapper">
               <Tip />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入组合式API函数
import { onMounted, ref } from 'vue';
import { reqHospitalList } from '@/api/home';
//引入首页子组件
import Carousel from './carousel/index.vue';
import Search from './search/index.vue';
import Level from './level/index.vue';
import Region from './region/index.vue';
import Card from './card/index.vue';
import Tip from './tip/index.vue';
import type { Content, HospitalResponseData } from '@/api/home/type';

//分页器页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(10);
//存储医院总个数
let total = ref<number>(0);
//存储医院等级数据
let hostype = ref<string>('');
//存储地区数据
let districtCode = ref<string>('');
//存储所有医院的数据
let hospitalArr = ref<Content>([]);
// 加载状态
let loading = ref<boolean>(false);

//组件挂载完毕:发一次请求
onMounted(() => {
  getHospitalInfo();
});

//获取已有的医院的数据
const getHospitalInfo = async () => {
  loading.value = true;
  //获取医院的数据:默认获取第一页、一页十个医院的数据
  try {
    let result: HospitalResponseData = await reqHospitalList(
      pageNo.value,
      pageSize.value,
      hostype.value,
      districtCode.value
    );
    if (result.code == 200) {
      hospitalArr.value = result.data.content;
      //存储医院总个数
      total.value = result.data.totalElements;
    }
  } finally {
    loading.value = false;
  }
}

//分页器页码发生变化时候回调
const changePageNo = () => {
  //页码发生变化的时候,再次获取医院的数据
  getHospitalInfo();
}

//分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
  //当前页码归一
  pageNo.value = 1;
  //再次获取医院的数据
  getHospitalInfo();
}

//子组件自定义事件:获取等级数据
const getLevel = (level: string) => {
  hostype.value = level;
  getHospitalInfo();
}

//子组件自定义事件:获取地区数据
const getRegion = (region: string) => {
  districtCode.value = region;
  getHospitalInfo();
}
</script>

<style scoped lang="scss">
// Hero Section
.hero-wrapper {
  width: 100%;
  position: relative;
  // height is defined in Carousel component
}

// Search Section
.search-section {
  position: relative;
  z-index: 20;
  margin-top: 50px; // Overlap the hero section
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 $spacing-lg;

  .search-container {
    width: 100%;
    max-width: 800px; // 限制搜索框最大宽度
  }
}

// Main Content
.main-content {
  padding-bottom: $spacing-2xl;
  background-color: $color-bg-body;
  min-height: 100vh;
}

.container {
  width: $container-width;
  margin: 0 auto;
  position: relative;
}

.filter-section {
  background: white;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;
  border: 1px solid $color-border;

  .filter-title {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid $color-border;
  }

  .filter-group {
    display: flex;
    margin-bottom: $spacing-md;
    
    &:last-child {
      margin-bottom: 0;
    }

    .label {
      width: 60px;
      color: $color-text-secondary;
      font-weight: 500;
      padding-top: 4px; // 对齐胶囊
      flex-shrink: 0;
    }
  }
}

.hospital-list {
  .list-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 双列布局
    gap: $spacing-md;
  }
}

.pagination-wrapper {
  margin-top: $spacing-xl;
  @include flex-center;
}
</style>
