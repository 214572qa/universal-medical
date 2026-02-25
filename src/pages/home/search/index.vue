<template>
    <div class="search">
      <el-autocomplete @select="goDetail" clearable placeholder="请输入医院名称" v-model="hosname" :fetch-suggestions="fetchData" :trigger-on-focus="false"/>
      <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
// 引入搜索图标
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 引入请求方法
import { reqHospitalInfo } from '@/api/home';
import type { HospitalInfo } from '@/api/home/type';

//创建路由对象
const $router = useRouter();
//搜集搜索的关键字（医院名字）
let hosname = ref<string>('');
//获取顶部组件的回调
const fetchData = async(keyWord: string, cb:any) => {
  console.log(keyWord);
  
  //当用户输入完整关键字次函数会执行一次，发起请求获取需要展示的医院信息
  let result:HospitalInfo = await reqHospitalInfo(keyWord);
 // 整理数据，变成组件需要的数据格式
  let showData = result.data.map(item => {
    
    return {
      value: item.hosname,//展示的医院名字
      hoscode: item.hoscode//存储医院的编码
    }
  });
  //给组件提供数据展示户数
  cb(showData); 
}

//点击某一个推荐项
const goDetail = (item: any ) => {
  console.log(item);
  
  //点击推荐项目进入医院详情页面，将来需要携带query参数（医院的编码）
  $router.push({
    path: '/hospital/register',
    query: {
      hoscode: item.hoscode
    }
  })
}
</script>

<style scoped lang="scss">
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    // max-width is handled by parent
    margin: 0; 
    gap: 0;
    
    // 深度选择器，修改el-autocomplete组件的样式
    ::v-deep(.el-autocomplete) {
        flex: 1;
        
        .el-input__wrapper {
            border-top-left-radius: $radius-full;
            border-bottom-left-radius: $radius-full;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: none;
            
            // Glassmorphism Style
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 10px 25px rgba(30, 58, 138, 0.15); // Blue tint shadow
            
            padding: 12px 24px;
            height: 56px;
            transition: all $transition-base;
            
            &:hover,
            &.is-focus {
                box-shadow: 0 0 0 2px $color-tech-blue-light inset, $shadow-tech-glow;
                background: white;
            }
            
            .el-input__inner {
                font-size: 16px;
                color: $color-text-primary;
                
                &::placeholder {
                    color: $color-text-muted;
                }
            }
            
            .el-input__icon {
                color: $color-tech-blue-dark;
                font-size: 18px;
            }
        }
    }
    
    // 确保按钮和输入框对齐，并调整按钮样式
    ::v-deep(.el-button) {
        height: 56px;
        padding: 0 32px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: $radius-full;
        border-bottom-right-radius: $radius-full;
        margin-left: 0;
        
        // Tech Gradient
        background: $gradient-tech;
        border: none;
        
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 1px;
        transition: all $transition-base;
        box-shadow: 0 10px 20px rgba(30, 58, 138, 0.2);
        
        &:hover {
            transform: translateX(2px);
            box-shadow: $shadow-tech-glow;
            filter: brightness(1.1);
        }
        
        &:active {
            transform: translateX(0);
        }
        
        .el-icon {
            font-size: 18px;
            margin-right: 6px;
        }
    }
}

// 下拉建议列表样式
:global(.el-autocomplete-suggestion) {
    border-radius: $radius-md !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
    border: 1px solid rgba(6, 182, 212, 0.2) !important;
    backdrop-filter: blur(10px) !important;
    background: rgba(255, 255, 255, 0.95) !important;
    
    .el-autocomplete-suggestion__wrap {
        padding: 8px 0;
    }
    
    .el-autocomplete-suggestion__list {
        li {
            padding: 12px 20px;
            font-size: 14px;
            color: $color-text-secondary;
            transition: all 200ms ease;
            
            &:hover,
            &.highlighted {
                background: rgba(6, 182, 212, 0.1) !important;
                color: $color-tech-blue-dark !important;
            }
        }
    }
}
</style>
