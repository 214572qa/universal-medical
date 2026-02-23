<template>
    <div class="search">
      <el-autocomplete @select="goDetail" clearable placeholder="请输入医院名称" v-model="hosname" :fetch-suggestions="fetchData" :trigger-on-focus="false"/>
      <el-button type="primary" size="default" :icon = "Search">搜索</el-button>
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
.search{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin: 10px 0;
    gap: 0; // 清除间距
    
    // 深度选择器，修改el-autocomplete组件的样式
    ::v-deep(.el-autocomplete){
      width: 400px;
      
      // 移除输入框的右边框，让按钮看起来是连在一起的
      .el-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
      }
    }
    
    // 确保按钮和输入框对齐，并调整按钮样式
    ::v-deep(.el-button) {
      height: 32px; // 统一高度，与输入框匹配
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: 0; // 确保没有左边距
      
      // 添加一点左边框阴影效果，让连接更自然
      box-shadow: -1px 0 0 0 var(--el-border-color) inset;
      
      &:hover {
        box-shadow: -1px 0 0 0 var(--el-color-primary) inset;
      }
    }
  }
</style>
